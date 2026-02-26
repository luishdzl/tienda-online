"use client";

import { signIn } from "next-auth/react";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      window.location.href = "/redirect";
    } else {
      alert("Credenciales incorrectas");
    }
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
            <Link href="/register">Sign up</Link>
            </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="example@example.com"
                required onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required onChange={e => setPassword(e.target.value)} placeholder="password"/>
            </div>          <Button type="submit" className="w-full">
          Login
        </Button>
          </div>        

        </form>
      </CardContent>
    </Card>
    </div>
  );
}