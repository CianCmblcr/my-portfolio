import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const ICONS = [
  [/linkedin/i, FaLinkedinIn],
  [/twitter|x\.com|^x\b/i, FaXTwitter],
  [/behance/i, FaBehance],
  [/dribbble/i, FaDribbble],
  [/github/i, FaGithub],
  [/instagram/i, FaInstagram],
];

// Picks an icon from the social link's label or URL.
const SocialIcon = ({ label = "", href = "" }) => {
  const match = ICONS.find(([pattern]) => pattern.test(label) || pattern.test(href));
  const Icon = match ? match[1] : FaLink;
  return <Icon aria-hidden="true" />;
};

export default SocialIcon;
