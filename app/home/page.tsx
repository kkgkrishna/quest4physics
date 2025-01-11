import Footer from "./Footer";
import Header from "./Header";
import PopularCourse from "./PopularCourse";
import QuestCenter from "./QuestCenter";
import CustomSlider from "./Slider";
import TestimonialCarousel from "./TestimonialCarousel";
import Testimonials from "./Testimonials";

function HomePage() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkthbmhhaXlhIiwiaXNFbWFpbFZlcmlmaWVkIjpmYWxzZSwiaXNQaG9uZVZlcmlmaWVkIjpmYWxzZSwibGFzdE5hbWUiOiJHYXV0YW0iLCJlbWFpbCI6ImtrZ2tyaXNobmExMTJAZ21haWwuY29tIiwibW9iaWxlIjo3NjUxODkzNzEzLCJ1aWQiOiIxNGI3ZWUwYi02ZjM3LTRjMmYtODZlZC0zMDZhNTIyNDNmZTYiLCJfaWQiOiI2NmZmOWIwZjQ4Y2RjYWFhZDRmYTUyZWYifSwiaWF0IjoxNzM2NTg0MzE3LCJleHAiOjE3MzY3NTcxMTd9.ncZMZNdmoRBz1hsfB70hD1PDgmDCPGiw0WupXwUFgGI";
  return (
    <div>
      <Header />
      <CustomSlider />
      <PopularCourse />
      <QuestCenter />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage;
