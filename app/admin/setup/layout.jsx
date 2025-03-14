// This is a server component that can properly export metadata
import { metadata } from './metadata';

export { metadata };

export default function SetupLayout({ children }) {
  return children;
} 