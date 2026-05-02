import React from "react";
import CategoryCollectionPage from "./CategoryCollectionPage";

const NewArrivals = () => (
  <CategoryCollectionPage
    title="New Arrivals"
    defaultSort="-createdAt"
    emptyMessage="New arrivals will appear here as soon as products are added."
  />
);

export default NewArrivals;
