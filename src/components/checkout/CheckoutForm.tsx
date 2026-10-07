"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Loader2,
  Check,
  Lock,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { orderService } from "@/services/order.service";
import { searchCities, findCity, CityInfo } from "@/lib/cities";
import {
  VisaBadge,
  MastercardBadge,
  AmexBadge,
  UnionPayBadge,
} from "./PaymentBadges";
import type { PaymentMethod } from "@/types";

interface CheckoutFormProps {
  deliveryMethod: "standard" | "store_pickup" | "express";
  setDeliveryMethod: (method: "standard" | "store_pickup" | "express") => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  appliedCoupon?: {
    code: string;
    discount: number;
    discountType: "percentage" | "fixed";
  } | null;
  totalAmount: number;
  shippingQuoteReady: boolean;
}

export default function CheckoutForm({
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
  appliedCoupon,
  totalAmount,
  shippingQuoteReady,
}: CheckoutFormProps) {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();

  // Contact State
  const [email, setEmail] = useState(user?.email || "");
  const [emailOffers, setEmailOffers] = useState(true);

  // Delivery State
  const [searchCityQuery, setSearchCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [country] = useState("Pakistan");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saveInfo, setSaveInfo] = useState(false);

  // Billing Address State
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  // Card Payment State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Dropdown & Search States
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<CityInfo[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Validation & Error States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topBannerError, setTopBannerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState("");
  const [placedShipping, setPlacedShipping] = useState<{
    subtotal: number;
    baseCharge: number;
    additionalCharge: number;
    codFee: number;
    total: number;
  } | null>(null);

  // Load saved checkout information from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("heer_checkout_saved_info");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.email && !email) setEmail(data.email);
        if (data.firstName && !firstName) setFirstName(data.firstName);
        if (data.lastName && !lastName) setLastName(data.lastName);
        if (data.address && !address) setAddress(data.address);
        if (data.city && !selectedCity) {
          const matched = findCity(data.city);
          if (matched) {
            setSelectedCity(matched);
            setSearchCityQuery(matched.name);
          }
        }
        if (data.postalCode && !postalCode) setPostalCode(data.postalCode);
        if (data.phone && !phone) setPhone(data.phone);
        setSaveInfo(true);
      } else if (user) {
        if (user.email && !email) setEmail(user.email);
        if (user.firstName && !firstName) setFirstName(user.firstName);
        if (user.lastName && !lastName) setLastName(user.lastName);
        if (user.phone && !phone) setPhone(user.phone);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Handle city search queries
  useEffect(() => {
    setFilteredCities(searchCities(searchCityQuery));
  }, [searchCityQuery]);

  // Handle click outside of city dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = (city: CityInfo) => {
    setSelectedCity(city);
    setSearchCityQuery(city.name);
    setIsCityDropdownOpen(false);
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.city;
      delete updated.searchCity;
      return updated;
    });
    if (topBannerError === "Please select City / Town from dropdown") {
      setTopBannerError(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let bannerMessage: string | null = null;

    // Contact Email
    if (!email.trim()) {
      newErrors.email = "Please enter an email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // City Selection (Crucial from image 1)
    if (!selectedCity) {
      newErrors.city = "Please select City / Town from dropdown";
      newErrors.searchCity = "Please select City / Town from dropdown";
      bannerMessage = "Please select City / Town from dropdown";
    }

    // Name & Address
    if (!firstName.trim()) {
      newErrors.firstName = "Enter a first name";
      if (!bannerMessage) bannerMessage = "Enter a first name";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Enter a last name";
      if (!bannerMessage) bannerMessage = "Enter a last name";
    }
    if (!address.trim()) {
      newErrors.address = "Enter an address";
      if (!bannerMessage) bannerMessage = "Enter an address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Enter a phone number";
      if (!bannerMessage) bannerMessage = "Enter a phone number";
    }

    // Card Details if Card payment is chosen
    if (paymentMethod === "card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Enter card number";
      if (!cardExpiry.trim()) newErrors.cardExpiry = "Enter expiration date";
      if (!cardCvv.trim()) newErrors.cardCvv = "Enter security code";
      if (!cardName.trim()) newErrors.cardName = "Enter name on card";
    }

    // Billing Address if different
    if (!billingSameAsShipping) {
      if (!billingFirstName.trim()) newErrors.billingFirstName = "Enter first name";
      if (!billingLastName.trim()) newErrors.billingLastName = "Enter last name";
      if (!billingAddress.trim()) newErrors.billingAddress = "Enter address";
      if (!billingCity.trim()) newErrors.billingCity = "Enter city";
      if (!billingPhone.trim()) newErrors.billingPhone = "Enter phone number";
    }

    setErrors(newErrors);
    setTopBannerError(bannerMessage);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (items.length === 0) return;
    if (!shippingQuoteReady) {
      setTopBannerError("The latest shipping quote is not available. Please wait and try again.");
      return;
    }

    setIsSubmitting(true);
    setTopBannerError(null);

    try {
      // Save info if checked
      if (saveInfo && typeof window !== "undefined") {
        localStorage.setItem(
          "heer_checkout_saved_info",
          JSON.stringify({
            email,
            firstName,
            lastName,
            address,
            city: selectedCity?.name,
            postalCode,
            phone,
          })
        );
      }

      const shippingAddressData = {
        label: "Shipping",
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        addressLine1: address.trim(),
        address1: address.trim(),
        city: selectedCity?.name || "",
        province: selectedCity?.province || "Punjab",
        state: selectedCity?.province || "Punjab",
        country: country || "Pakistan",
        postalCode: postalCode.trim() || "00000",
      };

      const billingAddressData = billingSameAsShipping
        ? shippingAddressData
        : {
            label: "Billing",
            firstName: billingFirstName.trim(),
            lastName: billingLastName.trim(),
            email: email.trim(),
            phone: billingPhone.trim(),
            addressLine1: billingAddress.trim(),
            address1: billingAddress.trim(),
            city: billingCity.trim(),
            province: selectedCity?.province || "Punjab",
            state: selectedCity?.province || "Punjab",
            country: country || "Pakistan",
            postalCode: billingPostalCode.trim() || "00000",
          };

      const orderPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: shippingAddressData,
        billingAddress: billingAddressData,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        couponCode: appliedCoupon?.code,
        notes: `Delivery Method: ${
          deliveryMethod === "store_pickup"
            ? "Store Pickup"
            : deliveryMethod === "express"
              ? "Express Delivery"
              : "Standard Delivery"
        }`,
      };

      const createdOrder = await orderService.createOrder(orderPayload);

      setPlacedOrderNumber(createdOrder.orderNumber);
      const shippingBreakdown = createdOrder.shippingBreakdown;
      setPlacedShipping({
        subtotal: Number(createdOrder.subtotal || 0),
        baseCharge: Number(shippingBreakdown?.baseCharge ?? createdOrder.shippingCost ?? 0),
        additionalCharge: Number(shippingBreakdown?.additionalCharge || 0),
        codFee: Number(createdOrder.codFee || 0),
        total: Number(createdOrder.total || totalAmount),
      });
      setOrderPlaced(true);
      clearCart();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Could not place order. Please verify your details and try again.";
      setTopBannerError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank You / Order Confirmation View
  if (orderPlaced) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#005BD3]">
          <Check className="h-10 w-10 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          Thank you for your order!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Order confirmation has been sent to{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>

        <div className="mx-auto my-6 max-w-md rounded-xl border border-gray-200 bg-gray-50/80 p-5 text-left">
          <div className="flex items-center justify-between text-sm py-1 border-b border-gray-200">
            <span className="text-gray-500">Order Number</span>
            <span className="font-mono font-bold text-[#005BD3]">
              {placedOrderNumber}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
            <span className="text-gray-500">Delivery Method</span>
            <span className="font-medium text-gray-900 capitalize">
              {deliveryMethod === "store_pickup"
                ? "🏪 Store Pickup (Free)"
                : deliveryMethod === "express"
                  ? "🚚 Express Delivery"
                  : "🚚 Standard Delivery"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium text-gray-900 uppercase">
              {paymentMethod === "cod"
                ? "Cash on Delivery"
                : paymentMethod === "card"
                ? "Credit / Debit Card"
                : "PAYFAST"}
            </span>
          </div>
          {placedShipping && (
            <>
              <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">Rs. {placedShipping.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">
                  {placedShipping.baseCharge === 0 ? "FREE" : `Rs. ${placedShipping.baseCharge.toLocaleString()}`}
                </span>
              </div>
              {placedShipping.additionalCharge > 0 && (
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
                  <span className="text-gray-500">Additional Shipping Charges</span>
                  <span className="font-medium text-gray-900">Rs. {placedShipping.additionalCharge.toLocaleString()}</span>
                </div>
              )}
              {placedShipping.codFee > 0 && (
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-200">
                  <span className="text-gray-500">Cash on Delivery Fee</span>
                  <span className="font-medium text-gray-900">Rs. {placedShipping.codFee.toLocaleString()}</span>
                </div>
              )}
            </>
          )}
          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-gray-900">
              Rs. {(placedShipping?.total ?? totalAmount).toLocaleString()}
            </span>
          </div>
        </div>

        {deliveryMethod === "store_pickup" && (
          <div className="mx-auto mb-6 max-w-md rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-left text-xs text-blue-900">
            <p className="font-semibold">🏪 Store Pickup Location:</p>
            <p className="mt-1">Heer Collection Flagship Store</p>
            <p className="text-blue-700">MM Alam Road, Gulberg III, Lahore</p>
            <p className="mt-1 text-gray-600">
              Hours: Mon - Sat: 11:00 AM - 10:00 PM | Sun: 2:00 PM - 10:00 PM
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#005BD3] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0048A8] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/track-order"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Track Your Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleCompleteOrder} className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ERROR BANNER (Image 1)
      ───────────────────────────────────────────────────────────── */}
      {topBannerError && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#F87171] bg-[#FEF2F2] p-4 px-5 text-[#B91C1C] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#EF4444] text-[#DC2626] font-bold text-xs">
            !
          </div>
          <p className="text-sm font-medium text-[#7F1D1D]">{topBannerError}</p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. CONTACT SECTION (Image 1)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Contact
          </h2>
          {!user ? (
            <Link
              href="/auth/login?redirect=/checkout"
              className="text-sm font-medium text-[#005BD3] hover:underline"
            >
              Sign in
            </Link>
          ) : (
            <span className="text-xs text-gray-500">
              Signed in as{" "}
              <span className="font-medium text-gray-900">{user.email}</span>
            </span>
          )}
        </div>

        {/* Floating Label Email Input */}
        <div
          className={cn(
            "relative rounded-xl border bg-white transition-all",
            errors.email
              ? "border-[#DC2626] ring-1 ring-[#DC2626]"
              : "border-gray-300 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20"
          )}
        >
          <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
            Email
          </label>
          <input
            type="email"
            id="checkout-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.email;
                  return updated;
                });
              }
            }}
            placeholder=""
            className="w-full pt-5 pb-2 px-3.5 pr-10 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-transparent"
          />
          {/* Tooltip Help Icon */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 group">
            <HelpCircle className="h-4 w-4 text-gray-400 group-hover:text-gray-600 cursor-pointer transition-colors" />
            <div className="invisible group-hover:visible absolute right-0 bottom-full mb-2 w-56 rounded-lg bg-gray-900 p-2.5 text-xs text-white shadow-xl z-30 transition-all pointer-events-none">
              We'll send order confirmation and shipment tracking updates to this
              email address.
              <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-[#DC2626]">{errors.email}</p>
        )}

        {/* Email News & Offers Checkbox */}
        <label className="mt-3.5 flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={emailOffers}
            onChange={(e) => setEmailOffers(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#005BD3] focus:ring-[#005BD3]"
          />
          <span className="text-sm text-gray-800">
            Email me with news and offers
          </span>
        </label>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. DELIVERY SECTION (Image 1 & 2)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-4">
          Delivery
        </h2>

        {/* 3a. Search City / Town (Combobox / Dropdown) */}
        <div className="relative mb-3" ref={dropdownRef}>
          <div
            className={cn(
              "relative rounded-xl border bg-white transition-all",
              errors.searchCity || errors.city
                ? "border-[#DC2626] ring-1 ring-[#DC2626]"
                : "border-gray-300 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20"
            )}
          >
            <input
              ref={searchInputRef}
              type="text"
              id="search-city-town"
              value={searchCityQuery}
              onChange={(e) => {
                setSearchCityQuery(e.target.value);
                setIsCityDropdownOpen(true);
              }}
              onFocus={() => setIsCityDropdownOpen(true)}
              placeholder="Search City / Town"
              className="w-full py-3.5 px-3.5 pr-10 text-sm text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-500"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>

          {/* Error text underneath Search City / Town */}
          {(errors.searchCity || errors.city) && (
            <p className="mt-1 text-sm text-[#DC2626]">
              Please select City / Town from dropdown
            </p>
          )}

          {/* Dropdown Menu */}
          {isCityDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {searchCityQuery.trim()
                  ? `Search results (${filteredCities.length})`
                  : "Major Pakistani Cities"}
              </div>
              {filteredCities.length > 0 ? (
                filteredCities.map((c) => (
                  <button
                    type="button"
                    key={`${c.name}-${c.province}`}
                    onClick={() => handleSelectCity(c)}
                    className={cn(
                      "w-full px-3.5 py-2 text-left text-sm flex items-center justify-between hover:bg-blue-50 transition-colors",
                      selectedCity?.name === c.name
                        ? "bg-blue-50/70 font-semibold text-[#005BD3]"
                        : "text-gray-800"
                    )}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-gray-400">{c.province}</span>
                  </button>
                ))
              ) : (
                <div className="px-3.5 py-3 text-sm text-gray-500 text-center">
                  No city found matching "{searchCityQuery}". Please check the spelling.
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3b. Country/Region Select */}
        <div className="relative rounded-xl border border-gray-300 bg-white mb-3">
          <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
            Country/Region
          </label>
          <div className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 flex items-center justify-between">
            <span>{country}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* 3c. First name & Last name (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {/* First Name */}
          <div
            className={cn(
              "relative rounded-xl border bg-[#F0F5FF]/50 transition-all",
              errors.firstName
                ? "border-[#DC2626] ring-1 ring-[#DC2626]"
                : "border-gray-300 focus-within:border-[#005BD3] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#005BD3]/20"
            )}
          >
            <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
              First name
            </label>
            <input
              type="text"
              id="checkout-firstname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) {
                  setErrors((prev) => {
                    const u = { ...prev };
                    delete u.firstName;
                    return u;
                  });
                }
              }}
              className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
            />
          </div>

          {/* Last Name */}
          <div
            className={cn(
              "relative rounded-xl border bg-[#F0F5FF]/50 transition-all",
              errors.lastName
                ? "border-[#DC2626] ring-1 ring-[#DC2626]"
                : "border-gray-300 focus-within:border-[#005BD3] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#005BD3]/20"
            )}
          >
            <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
              Last name
            </label>
            <input
              type="text"
              id="checkout-lastname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) {
                  setErrors((prev) => {
                    const u = { ...prev };
                    delete u.lastName;
                    return u;
                  });
                }
              }}
              className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
            />
          </div>
        </div>

        {/* 3d. Address Input */}
        <div
          className={cn(
            "relative rounded-xl border bg-white mb-3 transition-all",
            errors.address
              ? "border-[#DC2626] ring-1 ring-[#DC2626]"
              : "border-gray-300 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20"
          )}
        >
          <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
            Address
          </label>
          <input
            type="text"
            id="checkout-address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) {
                setErrors((prev) => {
                  const u = { ...prev };
                  delete u.address;
                  return u;
                });
              }
            }}
            placeholder=""
            className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
          />
        </div>

        {/* 3e. City and Postal Code (2 columns from Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-1">
          {/* City */}
          <div>
            <div
              className={cn(
                "relative rounded-xl border bg-white transition-all",
                errors.city
                  ? "border-[#DC2626] ring-1 ring-[#DC2626]"
                  : "border-gray-300 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20"
              )}
            >
              <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                City
              </label>
              <input
                type="text"
                id="checkout-city"
                value={selectedCity?.name || searchCityQuery}
                onChange={(e) => {
                  setSearchCityQuery(e.target.value);
                  setIsCityDropdownOpen(true);
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }}
                className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
              />
            </div>
            {errors.city && (
              <p className="mt-1 text-sm text-[#DC2626]">
                Please select City / Town from dropdown
              </p>
            )}
          </div>

          {/* Postal code (optional) */}
          <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20 transition-all h-[54px]">
            <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
              Postal code (optional)
            </label>
            <input
              type="text"
              id="checkout-postalcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
            />
          </div>
        </div>

        {/* 3f. Phone Input with Tooltip */}
        <div
          className={cn(
            "relative rounded-xl border bg-white mt-3 mb-3 transition-all",
            errors.phone
              ? "border-[#DC2626] ring-1 ring-[#DC2626]"
              : "border-gray-300 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20"
          )}
        >
          <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
            Phone
          </label>
          <input
            type="tel"
            id="checkout-phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) {
                setErrors((prev) => {
                  const u = { ...prev };
                  delete u.phone;
                  return u;
                });
              }
            }}
            placeholder=""
            className="w-full pt-5 pb-2 px-3.5 pr-10 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
          />
          {/* Tooltip Help Icon */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 group">
            <HelpCircle className="h-4 w-4 text-gray-400 group-hover:text-gray-600 cursor-pointer transition-colors" />
            <div className="invisible group-hover:visible absolute right-0 bottom-full mb-2 w-56 rounded-lg bg-gray-900 p-2.5 text-xs text-white shadow-xl z-30 transition-all pointer-events-none">
              In case our delivery courier needs to contact you regarding your order.
              <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
        {errors.phone && (
          <p className="mt-1 text-xs text-[#DC2626] mb-3">{errors.phone}</p>
        )}

        {/* 3g. Save this information checkbox */}
        <label className="mt-3.5 flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#005BD3] focus:ring-[#005BD3]"
          />
          <span className="text-sm text-gray-800">
            Save this information for next time
          </span>
        </label>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CHOOSE DELIVERY METHOD (Image 2)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-8 rounded-2xl bg-[#F4F4F4] p-5 md:p-6 border border-gray-200/80">
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-base md:text-lg">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-xs font-serif font-bold text-gray-700">
            i
          </span>
          <h3>Choose Delivery Method</h3>
        </div>
        <p className="mt-1 text-sm text-gray-600 mb-5">
          Select how you'd like to receive your order.
        </p>

        <div className="space-y-3">
          {/* Button 1: Standard Delivery */}
          <div className="grid gap-3 sm:grid-cols-2">
            {(["standard", "express"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setDeliveryMethod(method)}
                className={cn(
                  "w-full py-3.5 px-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2.5 transition-all shadow-xs",
                  deliveryMethod === method
                    ? "bg-[#005BD3] text-white shadow-md shadow-blue-500/20"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
                )}
              >
                <span>🚚</span>
                <span>{method === "express" ? "Express Delivery" : "Standard Delivery"}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PAYMENT SECTION (Image 3)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Payment
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          All transactions are secure and encrypted.
        </p>

        {/* Radio Accordion Container */}
        <div className="rounded-xl border border-gray-300 divide-y divide-gray-200 overflow-hidden bg-white">
          {/* Option 1: Cash on Delivery (COD) */}
          <div
            className={cn(
              "transition-colors",
              paymentMethod === "cod" ? "bg-blue-50/20" : "bg-white"
            )}
          >
            <label className="flex items-center justify-between p-4 cursor-pointer select-none" onClick={() => setPaymentMethod("cod")}>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                    paymentMethod === "cod"
                      ? "border-[#005BD3] bg-white"
                      : "border-gray-400 bg-white"
                  )}
                >
                  {paymentMethod === "cod" && (
                    <span className="h-2 w-2 rounded-full bg-[#005BD3]" />
                  )}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Cash on Delivery (COD)
                </span>
              </div>
            </label>
            {paymentMethod === "cod" && (
              <div className="px-4 pb-4 pt-1 text-xs text-gray-500 border-t border-gray-100">
                Pay with cash upon delivery of your parcel at your doorstep.
              </div>
            )}
          </div>

          {/* Option 2: Credit / Debit Card */}
          <div
            className={cn(
              "transition-colors",
              paymentMethod === "card" ? "bg-blue-50/20" : "bg-white"
            )}
          >
            <label
              className="flex items-center justify-between gap-2 p-4 cursor-pointer select-none"
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                    paymentMethod === "card"
                      ? "border-[#005BD3] bg-white"
                      : "border-gray-400 bg-white"
                  )}
                >
                  {paymentMethod === "card" && (
                    <span className="h-2 w-2 rounded-full bg-[#005BD3]" />
                  )}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Credit / Debit Card
                </span>
              </div>

              {/* Logos on right — hidden on very small screens */}
              <div className="hidden min-[400px]:flex items-center gap-1.5">
                <VisaBadge />
                <MastercardBadge />
                <AmexBadge />
              </div>
            </label>

            {/* Expanded Card Fields */}
            {paymentMethod === "card" && (
              <div className="p-4 pt-2 border-t border-gray-200/80 bg-gray-50/60 space-y-3">
                {/* Card Number */}
                <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                  <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                    Card number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full pt-5 pb-2 px-3.5 pr-10 text-sm font-mono text-gray-900 bg-transparent outline-none rounded-xl"
                  />
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Expiration date */}
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      Expiration date (MM / YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full pt-5 pb-2 px-3.5 text-sm font-mono text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                  </div>

                  {/* Security code */}
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      Security code (CVV)
                    </label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full pt-5 pb-2 px-3.5 pr-10 text-sm font-mono text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                    <HelpCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Name on card */}
                <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                  <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                    Name on card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ayesha Khan"
                    className="w-full pt-5 pb-2 px-3.5 text-sm font-normal text-gray-900 bg-transparent outline-none rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Option 3: PAYFAST */}
          <div
            className={cn(
              "transition-colors",
              paymentMethod === "payfast" ? "bg-blue-50/20" : "bg-white"
            )}
          >
            <label
              className="flex items-center justify-between gap-2 p-4 cursor-pointer select-none"
              onClick={() => setPaymentMethod("payfast")}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    paymentMethod === "payfast"
                      ? "border-[#005BD3] bg-white"
                      : "border-gray-400 bg-white"
                  )}
                >
                  {paymentMethod === "payfast" && (
                    <span className="h-2 w-2 rounded-full bg-[#005BD3]" />
                  )}
                </span>
                <span className="text-sm font-medium text-gray-900 leading-tight">
                  <span className="block">PAYFAST</span>
                  <span className="block text-xs text-gray-500 font-normal">Card / Wallet / Bank</span>
                </span>
              </div>

              {/* Logos on right — hidden on very small screens */}
              <div className="hidden min-[400px]:flex items-center gap-1.5 shrink-0">
                <VisaBadge />
                <MastercardBadge />
                <UnionPayBadge />
              </div>
            </label>

            {paymentMethod === "payfast" && (
              <div className="p-4 pt-2 border-t border-gray-200/80 bg-gray-50/60 text-xs text-gray-600">
                <p>
                  After clicking <strong>Complete order</strong>, you will be
                  securely redirected to PAYFAST to complete your payment with
                  Debit/Credit Card, Bank Account, JazzCash, or EasyPaisa.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BILLING ADDRESS SECTION (Image 3)
      ───────────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-4">
          Billing address
        </h2>

        <div className="rounded-xl border border-gray-300 divide-y divide-gray-200 overflow-hidden bg-white">
          {/* Option 1: Same as shipping address */}
          <label
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer select-none transition-colors",
              billingSameAsShipping ? "bg-blue-50/20" : "bg-white"
            )}
            onClick={() => setBillingSameAsShipping(true)}
          >
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                billingSameAsShipping
                  ? "border-[#005BD3] bg-white"
                  : "border-gray-400 bg-white"
              )}
            >
              {billingSameAsShipping && (
                <span className="h-2 w-2 rounded-full bg-[#005BD3]" />
              )}
            </span>
            <span className="text-sm font-medium text-gray-900">
              Same as shipping address
            </span>
          </label>

          {/* Option 2: Use a different billing address */}
          <div
            className={cn(
              "transition-colors",
              !billingSameAsShipping ? "bg-blue-50/20" : "bg-white"
            )}
          >
            <label
              className="flex items-center gap-3 p-4 cursor-pointer select-none"
              onClick={() => setBillingSameAsShipping(false)}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                  !billingSameAsShipping
                    ? "border-[#005BD3] bg-white"
                    : "border-gray-400 bg-white"
                )}
              >
                {!billingSameAsShipping && (
                  <span className="h-2 w-2 rounded-full bg-[#005BD3]" />
                )}
              </span>
              <span className="text-sm font-medium text-gray-900">
                Use a different billing address
              </span>
            </label>

            {/* Expanded Billing Address Form */}
            {!billingSameAsShipping && (
              <div className="p-4 pt-2 border-t border-gray-200/80 bg-gray-50/60 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      First name
                    </label>
                    <input
                      type="text"
                      value={billingFirstName}
                      onChange={(e) => setBillingFirstName(e.target.value)}
                      className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={billingLastName}
                      onChange={(e) => setBillingLastName(e.target.value)}
                      className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                  <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                    Address
                  </label>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      City
                    </label>
                    <input
                      type="text"
                      value={billingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                      className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                  <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                    <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                      Postal code (optional)
                    </label>
                    <input
                      type="text"
                      value={billingPostalCode}
                      onChange={(e) => setBillingPostalCode(e.target.value)}
                      className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                    />
                  </div>
                </div>

                <div className="relative rounded-xl border border-gray-300 bg-white focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-[#005BD3]/20">
                  <label className="absolute top-1.5 left-3.5 text-[11px] font-normal text-gray-500 pointer-events-none">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={billingPhone}
                    onChange={(e) => setBillingPhone(e.target.value)}
                    className="w-full pt-5 pb-2 px-3.5 text-sm text-gray-900 bg-transparent outline-none rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. COMPLETE ORDER BUTTON (Image 3)
      ───────────────────────────────────────────────────────────── */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full py-4 px-6 rounded-xl font-semibold text-base text-white bg-[#005BD3] hover:bg-[#0048A8] active:scale-[0.99] transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing order...</span>
            </>
          ) : (
            <span>Complete order</span>
          )}
        </button>
      </div>
    </form>
  );
}