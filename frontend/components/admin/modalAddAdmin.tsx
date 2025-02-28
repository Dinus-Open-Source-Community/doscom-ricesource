import React from 'react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateAdmin() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                    Add admin
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white z-50">
                <DialogHeader>
                    <DialogTitle>Add admin</DialogTitle>
                    <DialogDescription>
                        Make admin account, if done press save change
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" defaultValue="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" defaultValue="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password" type="password" defaultValue="" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-red-600 hover:bg-green-700">
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Add admin
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
