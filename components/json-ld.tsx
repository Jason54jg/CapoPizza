import { BUSINESS, OPENING_LABEL } from "@/lib/business";

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FoodEstablishment"],
    name: BUSINESS.name,
    description:
      "Pizzeria Capo Pizza à Neufchâteau : pizzas artisanales, burgers, tacos, pâtes. À emporter et livraison.",
    image: "https://images.unsplash.com/photo-1604384847932-cff2a0b4cb64?auto=format&fit=crop&w=1200&q=80",
    telephone: "+33355016739",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressStreet,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.355,
      longitude: 5.605,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "18:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["Pizza", "Italian", "FastFood"],
    priceRange: "€",
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.snapchat,
    ],
    amenityFeature: {
      "@type": "LocationFeatureSpecification",
      name: OPENING_LABEL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
