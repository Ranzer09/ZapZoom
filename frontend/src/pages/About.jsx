import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect } from "react";
import about from "../assets/aboutbg.jpeg";
import "./about.css";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: "2px" }}>
      <Box
        className="about-content"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          width: "100%",
          height: "366px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          className="main-heading2"
          variant="h1"
          sx={{
            color: "white",
            backgroundColor: "#00000078",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          ABOUT US
        </Typography>
      </Box>
      <Grid2 container>
        {/* change image after 480px */}
        <Grid2
          sx={{
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "600",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: "black",
                marginBlock: "20px",
              }}
            >
              Who We Are
            </Typography>
            <Typography
              sx={{
                color: "#313131",
                marginTop: "20px",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                width: { sm: "80%", md: "60%" },
                margin: "auto",
                fontFamily: "'Lato',sans-serif",
              }}
            >
              We are passionate about bringing you the best in quality products
              across a wide range of categories, from fashion and beauty to home
              goods, electronics, and more.
            </Typography>
            <br />
            <Box
              sx={{
                padding: "20px",
                width: { sm: "80%", md: "60%" },
                margin: "auto",
              }}
            >
              <img
                src="https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="about1"
                style={{
                  width: "80%",
                  height: "auto",
                  margin: "auto",
                  ...(window.innerWidth >= 760 && { width: "60%" }),
                }}
              />
              <Typography
                sx={{
                  color: "#313131",
                  marginTop: "20px",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  fontFamily: "'Lato',sans-serif",
                }}
              >
                At ZapZoom, we believe that shopping should be convenient,
                enjoyable, and accessible for everyone. Whether you're searching
                for the latest trends, essential everyday items, or unique
                finds, we make it easy to discover products you’ll love, at
                prices you’ll adore.
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "20px",
                width: { sm: "80%", md: "60%" },
                margin: "auto",
              }}
            >
              <img
                src="https://images.pexels.com/photos/1258935/pexels-photo-1258935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="about2"
                style={{
                  width: "80%",
                  height: "auto",
                  margin: "auto",
                  ...(window.innerWidth >= 760 && { width: "60%" }),
                }}
              />
              <Typography
                sx={{
                  color: "#313131",
                  marginTop: "20px",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  fontFamily: "'Lato',sans-serif",
                }}
              >
                Our mission is to provide our customers with a seamless shopping
                experience that combines variety, value, and exceptional
                service. We strive to make online shopping easy, secure, and
                fun, bringing you the products you want, right to your doorstep.
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
