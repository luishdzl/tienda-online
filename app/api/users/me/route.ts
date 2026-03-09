import { NextResponse } from "next/server"
import { auth } from "@/features/auth/auth.config" // Adjust the import path as needed
import { PrismaClient } from "@/lib/generated/prisma/client"

const prisma = new PrismaClient()

export async function PATCH(req: Request) {

const session = await auth()

if (!session?.user?.id) {
return NextResponse.json(
{ error: "Unauthorized" },
{ status: 401 }
)
}

try {

const body = await req.json()

const { name, email, image } = body

const updatedUser = await prisma.user.update({
where: { id: session.user.id },
data: {
name,
email,
image
}
})

return NextResponse.json({
success: true,
user: updatedUser
})

} catch (error) {

console.error(error)

return NextResponse.json(
{ error: "Failed to update user" },
{ status: 500 }
)

}

}