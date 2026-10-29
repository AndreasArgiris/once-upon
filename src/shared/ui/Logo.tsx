import { BRAND_NAME } from "../constants/brand";
import { MEDIA } from "../constants/media";

export default function Logo({ className }: { className: string }) {
  return <img src={MEDIA.logo} alt={BRAND_NAME} className={className} />;
}
