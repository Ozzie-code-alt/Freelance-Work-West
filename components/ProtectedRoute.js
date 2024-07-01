
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) router.push("/LoginPage"); 
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  if (!session) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
