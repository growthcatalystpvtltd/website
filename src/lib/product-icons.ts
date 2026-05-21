import {
  Brain,
  LayoutDashboard,
  Package,
  Radio,
  ShoppingCart,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "catalyst-erp": LayoutDashboard,
  "catalyst-commerce": ShoppingCart,
  "catalyst-fintrack": Wallet,
  "catalyst-iot-gateway": Radio,
  "catalyst-ai": Brain,
  "catalyst-logistics": Truck,
};

export function getProductIcon(slug: string): LucideIcon {
  return PRODUCT_ICONS[slug] ?? Package;
}
