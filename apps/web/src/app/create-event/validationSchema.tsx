import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  title: Yup.string().required("Event Name is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  stock: Yup.number().required("Available Seats is required"),
});
