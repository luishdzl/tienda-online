import { Role, DiscountType } from "../lib/generated/prisma/client"
import "dotenv/config"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma/client"
import seedData from "./seed.json"

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {

console.log("🌱 Starting seed...")

/* =========================
   USERS
========================= */

for (const user of seedData.users) {

await prisma.user.upsert({
where: { email: user.email },
update: {},
create: {
email: user.email,
name: user.name,
role: user.role as Role
}
})

}

console.log("✅ Users created")

/* =========================
   PERMISSIONS
========================= */

for (const permission of seedData.permissions) {

await prisma.permission.upsert({
where: { name: permission.name },
update: {},
create: permission
})

}

console.log("✅ Permissions created")

const permissions = await prisma.permission.findMany()

const getPermissionId = (name: string) =>
permissions.find(p => p.name === name)!.id

/* =========================
   ROLE PERMISSIONS
========================= */

const adminPermissions = [
"admin.access",
"users.read",
"users.manage",
"workshops.manage",
"bookings.manage",
"reviews.moderate",
"coupons.manage"
]

for (const name of adminPermissions) {

await prisma.rolePermission.upsert({
where: {
role_permissionId: {
role: Role.ADMIN,
permissionId: getPermissionId(name)
}
},
update: {},
create: {
role: Role.ADMIN,
permissionId: getPermissionId(name)
}
})

}

const userPermissions = [
"workshops.read",
"bookings.create",
"reviews.create"
]

for (const name of userPermissions) {

await prisma.rolePermission.upsert({
where: {
role_permissionId: {
role: Role.USER,
permissionId: getPermissionId(name)
}
},
update: {},
create: {
role: Role.USER,
permissionId: getPermissionId(name)
}
})

}

console.log("✅ Role permissions created")

/* =========================
   USER PERMISSIONS
========================= */

for (const user of seedData.users) {

if (!user.extraPermissions) continue

const dbUser = await prisma.user.findUnique({
where: { email: user.email }
})

for (const permissionName of user.extraPermissions) {

await prisma.userPermission.upsert({
where: {
userId_permissionId: {
userId: dbUser!.id,
permissionId: getPermissionId(permissionName)
}
},
update: {},
create: {
userId: dbUser!.id,
permissionId: getPermissionId(permissionName)
}
})

}

}

console.log("✅ User permissions created")

/* =========================
   LOCATIONS
========================= */

for (const location of seedData.locations) {

await prisma.location.create({
data: location
})

}

const locations = await prisma.location.findMany()

console.log("✅ Locations created")

/* =========================
   CATEGORIES
========================= */

for (const category of seedData.categories) {

await prisma.category.upsert({
where: { slug: category.slug },
update: {},
create: category
})

}

console.log("✅ Categories created")

/* =========================
   WORKSHOPS
========================= */

for (const workshop of seedData.workshops) {

await prisma.workshop.upsert({
where: { slug: workshop.slug },
update: {},
create: {
title: workshop.title,
slug: workshop.slug,
description: workshop.description,
price: workshop.price,
duration: workshop.duration,
date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
availableSlots: workshop.availableSlots,
locationId: locations[0].id,
imageUrls: [],
videoUrls: []
}
})

}

console.log("✅ Workshops created")

/* =========================
   COUPONS
========================= */

for (const coupon of seedData.coupons) {

await prisma.coupon.upsert({
where: { code: coupon.code },
update: {},
create: {
code: coupon.code,
discountType: coupon.discountType as DiscountType,
discountValue: coupon.discountValue,
validFrom: new Date(),
validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
}
})

}

console.log("✅ Coupons created")

console.log("🌱 Seed finished successfully")

}

main()
.then(async () => {
await prisma.$disconnect()
await pool.end()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
await pool.end()
process.exit(1)
})