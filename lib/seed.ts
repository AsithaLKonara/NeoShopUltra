import { db } from "./db"

async function seed() {
  console.log("🌱 Seeding database...")

  // Create categories
  const electronics = await db.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Latest electronic devices and gadgets",
      image: "/placeholder.svg?height=200&width=200",
    },
  })

  const smartphones = await db.category.create({
    data: {
      name: "Smartphones",
      slug: "smartphones",
      description: "Latest smartphones and mobile devices",
      image: "/placeholder.svg?height=200&width=200",
      parentId: electronics.id,
    },
  })

  const laptops = await db.category.create({
    data: {
      name: "Laptops",
      slug: "laptops",
      description: "High-performance laptops and notebooks",
      image: "/placeholder.svg?height=200&width=200",
      parentId: electronics.id,
    },
  })

  // Create products
  const products = [
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      description: "The most advanced iPhone with titanium design and A17 Pro chip",
      price: 1199,
      originalPrice: 1299,
      sku: "IPH15PM-256-TIT",
      stock: 50,
      images: ["/placeholder.svg?height=400&width=400"],
      tags: ["smartphone", "apple", "premium", "new"],
      isFeatured: true,
      categoryId: smartphones.id,
    },
    {
      name: "MacBook Air M3",
      slug: "macbook-air-m3",
      description: "Supercharged by the M3 chip, incredibly thin and light",
      price: 1099,
      sku: "MBA-M3-256-SG",
      stock: 30,
      images: ["/placeholder.svg?height=400&width=400"],
      tags: ["laptop", "apple", "ultrabook", "new"],
      isFeatured: true,
      categoryId: laptops.id,
    },
    {
      name: "AirPods Pro 2",
      slug: "airpods-pro-2",
      description: "Active Noise Cancellation with Adaptive Transparency",
      price: 249,
      originalPrice: 279,
      sku: "APP2-USB-C",
      stock: 100,
      images: ["/placeholder.svg?height=400&width=400"],
      tags: ["audio", "apple", "wireless", "sale"],
      isFeatured: true,
      categoryId: electronics.id,
    },
    {
      name: 'iPad Pro 12.9"',
      slug: "ipad-pro-12-9",
      description: "The ultimate iPad experience with M2 chip",
      price: 1099,
      sku: "IPP-129-M2-256",
      stock: 25,
      images: ["/placeholder.svg?height=400&width=400"],
      tags: ["tablet", "apple", "creative", "new"],
      isFeatured: true,
      categoryId: electronics.id,
    },
  ]

  for (const product of products) {
    await db.product.create({ data: product })
  }

  // Create sample user
  const user = await db.user.create({
    data: {
      email: "demo@neoshop.com",
      name: "Demo User",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  })

  console.log("✅ Database seeded successfully!")
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
