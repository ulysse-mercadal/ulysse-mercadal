import DottedMap from "dotted-map";

const frenchCities = [
  { name: "Bourg-en-Bresse", lat: 46.2059, lng: 5.2276 },
  { name: "Laon", lat: 49.5654, lng: 3.6233 },
  { name: "Moulins", lat: 46.5667, lng: 3.3333 },
  { name: "Digne-les-Bains", lat: 44.0935, lng: 6.2333 },
  { name: "Gap", lat: 44.5583, lng: 6.0789 },
  { name: "Nice", lat: 43.7034, lng: 7.2663 },
  { name: "Privas", lat: 44.7361, lng: 4.6000 },
  { name: "Charleville-Mézières", lat: 49.7733, lng: 4.7233 },
  { name: "Foix", lat: 42.9667, lng: 1.6000 },
  { name: "Troyes", lat: 48.2957, lng: 4.076 },
  { name: "Carcassonne", lat: 43.2135, lng: 2.3484 },
  { name: "Rodez", lat: 44.3533, lng: 2.5733 },
  { name: "Marseille", lat: 43.2965, lng: 5.3698 },
  { name: "Caen", lat: 49.1829, lng: -0.3707 },
  { name: "Aurillac", lat: 44.9267, lng: 2.4458 },
  { name: "Angoulême", lat: 45.6486, lng: 0.1583 },
  { name: "La Rochelle", lat: 46.1603, lng: -1.1511 },
  { name: "Bourges", lat: 47.0841, lng: 2.3964 },
  { name: "Tulle", lat: 45.1606, lng: 1.7708 },
  { name: "Dijon", lat: 47.3220, lng: 5.0415 },
  { name: "Saint-Brieuc", lat: 48.5135, lng: -2.7668 },
  { name: "Guéret", lat: 46.1700, lng: 1.8700 },
  { name: "Périgueux", lat: 45.1850, lng: 0.7200 },
  { name: "Besançon", lat: 47.2378, lng: 6.0244 },
  { name: "Valence", lat: 44.9333, lng: 4.8917 },
  { name: "Évreux", lat: 49.0250, lng: 1.1500 },
  { name: "Chartres", lat: 48.4476, lng: 1.4869 },
  { name: "Quimper", lat: 47.9977, lng: -4.1033 },
  { name: "Nîmes", lat: 43.8367, lng: 4.3600 },
  { name: "Toulouse", lat: 43.6047, lng: 1.4442 },
  { name: "Auch", lat: 43.6461, lng: 0.5861 },
  { name: "Bordeaux", lat: 44.8378, lng: -0.5792 },
  { name: "Montpellier", lat: 43.6108, lng: 3.8767 },
  { name: "Rennes", lat: 48.1173, lng: -1.6778 },
  { name: "Châteauroux", lat: 46.8067, lng: 1.6900 },
  { name: "Tours", lat: 47.3941, lng: 0.6848 },
  { name: "Grenoble", lat: 45.1885, lng: 5.7245 },
  { name: "Lons-le-Saunier", lat: 46.6767, lng: 5.5567 },
  { name: "Mont-de-Marsan", lat: 43.8933, lng: -0.5000 },
  { name: "Blois", lat: 47.5900, lng: 1.3300 },
  { name: "Saint-Étienne", lat: 45.4397, lng: 4.3872 },
  { name: "Le Puy-en-Velay", lat: 45.0431, lng: 3.8853 },
  { name: "Nantes", lat: 47.2184, lng: -1.5536 },
  { name: "Orléans", lat: 47.9029, lng: 1.9093 },
  { name: "Cahors", lat: 44.4489, lng: 1.4422 },
  { name: "Agen", lat: 44.2000, lng: 0.6333 },
  { name: "Mende", lat: 44.5167, lng: 3.5000 },
  { name: "Angers", lat: 47.4784, lng: -0.5632 },
  { name: "Saint-Lô", lat: 49.1167, lng: -1.0833 },
  { name: "Châlons-en-Champagne", lat: 48.9570, lng: 4.3667 },
  { name: "Chaumont", lat: 48.1067, lng: 5.1367 },
  { name: "Laval", lat: 48.0700, lng: -0.7700 },
  { name: "Nancy", lat: 48.6921, lng: 6.1844 },
  { name: "Bar-le-Duc", lat: 48.7700, lng: 5.1600 },
  { name: "Vannes", lat: 47.6583, lng: -2.7594 },
  { name: "Metz", lat: 49.1191, lng: 6.1727 },
  { name: "Nevers", lat: 46.9964, lng: 3.1603 },
  { name: "Lille", lat: 50.6292, lng: 3.0573 },
  { name: "Beauvais", lat: 49.4333, lng: 2.0833 },
  { name: "Alençon", lat: 48.4333, lng: 0.0900 },
  { name: "Arras", lat: 50.2925, lng: 2.7964 },
  { name: "Clermont-Ferrand", lat: 45.7772, lng: 3.0870 },
  { name: "Pau", lat: 43.3000, lng: -0.3667 },
  { name: "Tarbes", lat: 43.2333, lng: 0.0833 },
  { name: "Perpignan", lat: 42.6986, lng: 2.8956 },
  { name: "Strasbourg", lat: 48.5833, lng: 7.7458 },
  { name: "Colmar", lat: 48.0793, lng: 7.3584 },
  { name: "Lyon", lat: 45.7640, lng: 4.8357 },
  { name: "Vesoul", lat: 47.6200, lng: 6.1500 },
  { name: "Mâcon", lat: 46.3067, lng: 4.8333 },
  { name: "Le Mans", lat: 48.0061, lng: 0.1995 },
  { name: "Chambéry", lat: 45.5667, lng: 5.9167 },
  { name: "Annecy", lat: 45.8992, lng: 6.1294 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Rouen", lat: 49.4432, lng: 1.0996 },
  { name: "Melun", lat: 48.5400, lng: 2.6600 },
  { name: "Versailles", lat: 48.8014, lng: 2.1301 },
  { name: "Niort", lat: 46.3250, lng: -0.4639 },
  { name: "Amiens", lat: 49.8941, lng: 2.2958 },
  { name: "Albi", lat: 43.9288, lng: 2.1499 },
  { name: "Montauban", lat: 44.0183, lng: 1.3550 },
  { name: "Toulon", lat: 43.1242, lng: 5.9280 },
  { name: "Avignon", lat: 43.9493, lng: 4.8069 },
  { name: "La Roche-sur-Yon", lat: 46.6700, lng: -1.4292 },
  { name: "Poitiers", lat: 46.5802, lng: 0.3400 },
  { name: "Limoges", lat: 45.8336, lng: 1.2611 },
  { name: "Épinal", lat: 48.1733, lng: 6.4494 },
  { name: "Auxerre", lat: 47.7961, lng: 3.5761 },
  { name: "Belfort", lat: 47.6400, lng: 6.8600 },
  { name: "Évry-Courcouronnes", lat: 48.6290, lng: 2.4290 },
  { name: "Nanterre", lat: 48.8900, lng: 2.2000 },
  { name: "Bobigny", lat: 48.9067, lng: 2.4458 },
  { name: "Créteil", lat: 48.7833, lng: 2.4667 },
  { name: "Cergy", lat: 49.0333, lng: 2.0667 },
];

const SimpleWorldMap = () => {
  const map = new DottedMap({ height: 60, grid: "diagonal" });

  frenchCities.forEach((city) => {
    map.addPin({
      lat: city.lat,
      lng: city.lng,
      svgOptions: { color: "#FF69B4", radius: 0.2 }, // Changed radius to match background dots
    });
  });

  const svgMap = map.getSVG({
    radius: 0.2,
    color: "#423B38",
    shape: "circle",
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgMap }}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "200px",
      }}
    />
  );
};

export default SimpleWorldMap;