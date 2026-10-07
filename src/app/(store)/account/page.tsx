"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
  Loader2,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { orderService } from "@/services/order.service";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: typeof CheckCircle; color: string }
> = {
  pending: { label: "Pending", icon: Clock, color: "text-amber-500" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-500" },
  processing: { label: "Processing", icon: Package, color: "text-indigo-500" },
  shipped: { label: "Shipped", icon: Truck, color: "text-[#C9A27E]" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-emerald-500" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500" },
  returned: { label: "Returned", icon: AlertCircle, color: "text-orange-500" },
  // Uppercase fallbacks
  PENDING: { label: "Pending", icon: Clock, color: "text-amber-500" },
  CONFIRMED: { label: "Confirmed", icon: CheckCircle, color: "text-blue-500" },
  PROCESSING: { label: "Processing", icon: Package, color: "text-indigo-500" },
  SHIPPED: { label: "Shipped", icon: Truck, color: "text-[#C9A27E]" },
  DELIVERED: { label: "Delivered", icon: CheckCircle, color: "text-emerald-500" },
  CANCELLED: { label: "Cancelled", icon: XCircle, color: "text-red-500" },
  RETURNED: { label: "Returned", icon: AlertCircle, color: "text-orange-500" },
};

type Tab = "orders" | "addresses" | "settings";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const userId = user?.id;

  useEffect(() => {
    if (isAuthenticated && userId) {
      let ignore = false;
      setIsOrdersLoading(true);
      orderService
        .getMyOrders(1, 10)
        .then((response) => {
          if (!ignore) setOrders(response.data || []);
        })
        .catch(() => {
          if (!ignore) setOrders([]);
        })
        .finally(() => {
          if (!ignore) setIsOrdersLoading(false);
        });

      return () => {
        ignore = true;
      };
    }
  }, [isAuthenticated, userId]);

  if (!isAuthenticated || !user) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account" },
          ]}
          className="mb-6"
        />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8DDD4]">
            <User className="h-9 w-9 text-[#C9A27E]" />
          </div>
          <h2 className="mt-6 text-lg font-light text-[#1A1A1A]">
            Please sign in to view your account
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-[#C9A27E]" />
          <Link href="/auth/login" className="mt-8">
            <Button
              variant="gold"
              className="text-xs font-medium uppercase tracking-widest"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "orders", label: "Order History", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "My Account" },
        ]}
        className="mb-6"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide text-[#1A1A1A]">
          My Account
        </h1>
        <div className="mt-3 h-px w-12 bg-[#C9A27E]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-[#E8DDD4] bg-white/60 p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8DDD4] text-lg font-medium text-[#1A1A1A]">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-[#1A1A1A]/50">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                      activeTab === tab.id
                        ? "bg-[#C9A27E]/10 font-medium text-[#C9A27E]"
                        : "text-[#1A1A1A]/60 hover:bg-[#E8DDD4]/50 hover:text-[#1A1A1A]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#1A1A1A]/60 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-lg font-light text-[#1A1A1A]">Order History</h2>

              {isOrdersLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-[#C9A27E]" />
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-sm border border-[#E8DDD4] bg-white/60 p-12 text-center">
                  <Package className="mx-auto h-10 w-10 text-[#C9A27E]/50" />
                  <p className="mt-4 text-sm text-[#1A1A1A]/60">
                    You haven&apos;t placed any orders yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const statusKey = String(order.status || "").toLowerCase();
                    const statusInfo = STATUS_CONFIG[statusKey] || STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                    const StatusIcon = statusInfo.icon;
                    return (
                      <div
                        key={order.id}
                        className="rounded-sm border border-[#E8DDD4] bg-white/60 p-6"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-[#1A1A1A]">
                              Order #{order.orderNumber}
                            </p>
                            <p className="mt-1 text-xs text-[#1A1A1A]/50">
                              Placed on{" "}
                              {new Date(order.createdAt).toLocaleDateString("en-PK", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={cn("h-4 w-4", statusInfo.color)} />
                            <span
                              className={cn(
                                "text-xs font-medium uppercase tracking-wider",
                                statusInfo.color
                              )}
                            >
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 divide-y divide-[#E8DDD4]">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                            >
                              <div
                                className="h-16 w-14 flex-shrink-0 rounded-sm"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 100%)",
                                }}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-[#1A1A1A]">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-[#1A1A1A]/50">
                                  Qty: {item.quantity}
                                  {item.size && ` • Size: ${item.size}`}
                                  {item.color && ` • Color: ${item.color}`}
                                </p>
                              </div>
                              <span className="text-sm text-[#1A1A1A]">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#E8DDD4] pt-4">
                          <span className="text-xs text-[#1A1A1A]/50">
                            Total:{" "}
                            <span className="font-medium text-[#1A1A1A]">
                              Rs. {order.total.toLocaleString()}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center gap-1 text-xs font-medium text-[#C9A27E] transition-colors hover:text-[#C9A27E]/70 cursor-pointer"
                          >
                            View Details
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-light text-[#1A1A1A]">Addresses</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium uppercase tracking-widest"
                >
                  Add New
                </Button>
              </div>

              {(!user.addresses || user.addresses.length === 0) ? (
                <div className="rounded-sm border border-[#E8DDD4] bg-white/60 p-12 text-center">
                  <MapPin className="mx-auto h-10 w-10 text-[#C9A27E]/50" />
                  <p className="mt-4 text-sm text-[#1A1A1A]/60">
                    No saved addresses yet.
                  </p>
                  <p className="mt-1 text-xs text-[#1A1A1A]/40">
                    Add a shipping address for faster checkout.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {(user.addresses || []).map((addr) => (
                    <div
                      key={addr.id}
                      className={cn(
                        "rounded-sm border p-5",
                        addr.isDefault
                          ? "border-[#C9A27E] bg-[#C9A27E]/5"
                          : "border-[#E8DDD4] bg-white/60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                          {addr.label}
                        </p>
                        {addr.isDefault && (
                          <span className="rounded-full bg-[#C9A27E]/10 px-2 py-0.5 text-[10px] font-medium text-[#C9A27E]">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-[#1A1A1A]">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="mt-1 text-sm text-[#1A1A1A]/60">
                        {addr.address1}
                        {addr.address2 && `, ${addr.address2}`}
                      </p>
                      <p className="text-sm text-[#1A1A1A]/60">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-sm text-[#1A1A1A]/60">{addr.country}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-lg font-light text-[#1A1A1A]">
                Account Settings
              </h2>
              <div className="rounded-sm border border-[#E8DDD4] bg-white/60 p-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                        First Name
                      </label>
                      <p className="text-sm text-[#1A1A1A]">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                        Last Name
                      </label>
                      <p className="text-sm text-[#1A1A1A]">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                      Email
                    </label>
                    <p className="text-sm text-[#1A1A1A]">{user.email}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                      Member Since
                    </label>
                    <p className="text-sm text-[#1A1A1A]">
                      {new Date(user.createdAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-[#E8DDD4] pt-6">
                  <Button
                    variant="outline"
                    className="text-xs font-medium uppercase tracking-widest"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onOpenChange={(open) => {
            if (!open) setSelectedOrder(null);
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#FDFAF7] border-[#E8DDD4]">
            <DialogHeader className="border-b border-[#E8DDD4] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pr-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-[#1A1A1A]/50">
                    Order Details
                  </p>
                  <DialogTitle className="text-xl font-normal text-[#1A1A1A] mt-1">
                    #{selectedOrder.orderNumber}
                  </DialogTitle>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1">
                    Placed on{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-PK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {(() => {
                  const sKey = String(selectedOrder.status || "").toLowerCase();
                  const sInfo = STATUS_CONFIG[sKey] || STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.pending;
                  const SIcon = sInfo.icon;
                  return (
                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 border border-[#E8DDD4]">
                      <SIcon className={cn("h-4 w-4", sInfo.color)} />
                      <span className={cn("text-xs font-medium uppercase tracking-wider", sInfo.color)}>
                        {sInfo.label}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              {/* Items List */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-3">
                  Items Ordered ({selectedOrder.items?.length || 0})
                </h4>
                <div className="divide-y divide-[#E8DDD4] rounded-sm border border-[#E8DDD4] bg-white p-4">
                  {(selectedOrder.items || []).map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-14 w-12 flex-shrink-0 rounded-sm"
                          style={{
                            background: "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 100%)",
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A]">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-xs text-[#1A1A1A]/60">
                            Qty: {item.quantity}
                            {item.size && ` • Size: ${item.size}`}
                            {item.color && ` • Color: ${item.color}`}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A] whitespace-nowrap">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shipping Address */}
                <div className="rounded-sm border border-[#E8DDD4] bg-white p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#1A1A1A]">
                    <MapPin className="h-4 w-4 text-[#C9A27E]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider">Shipping Address</h4>
                  </div>
                  {(() => {
                    const addr: any = selectedOrder.shippingAddress || {};
                    const name = addr.fullName || [addr.firstName, addr.lastName].filter(Boolean).join(" ") || "Customer";
                    const street = addr.addressLine1 || addr.address1 || addr.address || "";
                    const cityState = [addr.city, addr.province || addr.state].filter(Boolean).join(", ");
                    const countryZip = [addr.postalCode, addr.country].filter(Boolean).join(" ");
                    return (
                      <div className="text-xs text-[#1A1A1A]/70 space-y-1">
                        <p className="font-medium text-[#1A1A1A]">{name}</p>
                        {addr.phone && <p>Phone: {addr.phone}</p>}
                        {street && <p>{street}</p>}
                        {cityState && <p>{cityState}</p>}
                        {countryZip && <p>{countryZip}</p>}
                      </div>
                    );
                  })()}
                </div>

                {/* Payment Info */}
                <div className="rounded-sm border border-[#E8DDD4] bg-white p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#1A1A1A]">
                    <CreditCard className="h-4 w-4 text-[#C9A27E]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider">Payment Details</h4>
                  </div>
                  <div className="text-xs text-[#1A1A1A]/70 space-y-1">
                    <p>
                      Method:{" "}
                      <span className="font-medium text-[#1A1A1A] uppercase">
                        {String(selectedOrder.paymentMethod || "cod").replace("_", " ")}
                      </span>
                    </p>
                    <p>
                      Payment Status:{" "}
                      <span className="font-medium capitalize text-[#1A1A1A]">
                        {String(selectedOrder.paymentStatus || "pending").toLowerCase()}
                      </span>
                    </p>
                    {selectedOrder.trackingNumber && (
                      <p className="pt-2 border-t border-[#E8DDD4] mt-2">
                        Tracking #: <span className="font-mono text-[#C9A27E]">{selectedOrder.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="rounded-sm border border-[#E8DDD4] bg-white p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Subtotal</span>
                  <span>Rs. {(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Shipping</span>
                  <span>
                    {Number(selectedOrder.shippingBreakdown?.baseCharge ?? selectedOrder.shippingCost) === 0
                      ? "FREE"
                      : `Rs. ${Number(selectedOrder.shippingBreakdown?.baseCharge ?? selectedOrder.shippingCost).toLocaleString()}`}
                  </span>
                </div>
                {Number(selectedOrder.shippingBreakdown?.additionalCharge) > 0 && (
                  <div className="flex justify-between text-[#1A1A1A]/70">
                    <span>Additional Shipping Charges</span>
                    <span>Rs. {Number(selectedOrder.shippingBreakdown?.additionalCharge).toLocaleString()}</span>
                  </div>
                )}
                {Number(selectedOrder.codFee) > 0 && (
                  <div className="flex justify-between text-[#1A1A1A]/70">
                    <span>Cash on Delivery Fee</span>
                    <span>Rs. {Number(selectedOrder.codFee).toLocaleString()}</span>
                  </div>
                )}
                {Boolean(selectedOrder.discount) && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-Rs. {Number(selectedOrder.discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#E8DDD4] pt-2 text-sm font-semibold text-[#1A1A1A]">
                  <span>Total Paid / Payable</span>
                  <span className="text-[#C9A27E]">Rs. {Number(selectedOrder.total).toLocaleString()}</span>
                </div>
              </div>

              {/* Track Order CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link
                  href={`/track-order`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C9A27E] hover:underline"
                >
                  <Truck className="h-3.5 w-3.5" />
                  Live Order Tracking
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                  className="text-xs uppercase tracking-wider"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </section>
  );
}
