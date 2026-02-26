"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  async function register(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/auth/register", {
      method: "POST",
      headers: {          
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    window.location.href = "/login";
  }

  return (
     <div className="h-screen flex justify-center items-center bg-gray-300">

       <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button asChild variant="link">
            <Link href="/login">Sign in</Link>
            </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={register} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                placeholder="name" onChange={e => setData({ ...data, name: e.target.value })}
              />
            </div>
                        <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="email" onChange={e => setData({ ...data, email: e.target.value })} 
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" placeholder="password" onChange={e => setData({ ...data, password: e.target.value })}/>
            </div>          <Button type="submit" className="w-full">
          Register
        </Button>
          </div>        

        </form>
      </CardContent>
    </Card>

    </div>
  );
}