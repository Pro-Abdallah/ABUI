export interface Employee {
  id: number;
  name: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave" | "Suspended";
  salary: number;
  rating: number;
  joinDate: string;
}

export function generateEmployeeData(count = 20): Employee[] {
  const firstNames = [
    "John", "Jane", "Robert", "Emily", "William", "Olivia", "David", "Sophia",
    "Michael", "Isabella", "James", "Mia", "Alexander", "Charlotte", "Daniel",
    "Amelia", "Joseph", "Evelyn", "Matthew", "Abigail", "Lucas", "Harper"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis",
    "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor",
    "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White"
  ];

  const departments = [
    "Engineering", "Product Management", "Design", "Marketing", "Sales",
    "Human Resources", "Finance", "Legal", "Operations", "Customer Success"
  ];

  const statuses: ("Active" | "Inactive" | "On Leave" | "Suspended")[] = [
    "Active", "Active", "Active", "Inactive", "On Leave", "Suspended"
  ];

  return Array.from({ length: count }, (_, idx) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const salary = Math.floor(Math.random() * 85000) + 45000; // $45,000 to $130,000
    const rating = Math.floor(Math.random() * 30 + 70) / 20; // 3.5 to 5.0
    
    // Random date within the last 5 years
    const year = Math.floor(Math.random() * 5) + 2021;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    const joinDate = `${year}-${month}-${day}`;

    return {
      id: idx + 101,
      name: `${firstName} ${lastName}`,
      department,
      status,
      salary,
      rating,
      joinDate,
    };
  });
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export function generateProductData(count = 12): Product[] {
  const categories = ["Electronics", "Apparel", "Home & Kitchen", "Fitness", "Books", "Office Supplies"];
  
  const productTemplates: Record<string, string[]> = {
    Electronics: ["Pro Headsets", "Wireless Charger", "Mechanical Keyboard", "USB-C Hub", "Smart Watch"],
    Apparel: ["Performance Hoodie", "Slim Fit Chinos", "Running Shoes", "Active Shorts", "Tech Tee"],
    "Home & Kitchen": ["Air Fryer", "Espresso Machine", "Ceramic Pan Set", "Knife Set", "Handheld Vacuum"],
    Fitness: ["Yoga Mat", "Adjustable Dumbbell", "Resistance Bands", "Foam Roller", "Water Bottle"],
    Books: ["Fiction Novel", "Sci-Fi Anthology", "Self-Help Guide", "Cookbook", "History Guide"],
    "Office Supplies": ["Ergonomic Chair", "Desk Pad", "Sticky Notes Set", "Gel Pens Pack", "Dual Monitor Stand"]
  };

  return Array.from({ length: count }, (_, idx) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const templates = productTemplates[category];
    const baseName = templates[Math.floor(Math.random() * templates.length)];
    const name = `${baseName} v${Math.floor(Math.random() * 3) + 1}`;
    const price = Math.floor(Math.random() * 240) + 10; // $10 to $250
    const stock = Math.floor(Math.random() * 120);
    const rating = Math.floor(Math.random() * 15 + 35) / 10; // 3.5 to 5.0

    const status = stock === 0
      ? "Out of Stock"
      : stock < 15
      ? "Low Stock"
      : "In Stock";

    return {
      id: idx + 201,
      name,
      category,
      price,
      stock,
      rating,
      status,
    };
  });
}
