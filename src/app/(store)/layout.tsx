import StoreLayout from "@/components/layout/StoreLayout";

export default function StoreLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreLayout>{children}</StoreLayout>;
}
