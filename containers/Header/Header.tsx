import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
export default function Header() {
  const router = useRouter();
  const isCartPage = router.pathname === "cart"; // quick solution
  return (
    <Box
      sx={{
        typography: "body1",
        "& > :not(style) + :not(style)": {
          ml: 2,
        },
      }}
      display="flex"
      alignItems={'center'}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
      />
      <Link href="/" variant="body2">
        Product List
      </Link>
      <Link href="/cart" variant="body2">
        Shopping Cart
      </Link>
    </Box>
  );
}
