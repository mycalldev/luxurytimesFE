// This is a server component that can properly export metadata
import { metadata } from './metadata';
import ClientLayout from '../layout';

export { metadata };

export default function DashboardLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
} 