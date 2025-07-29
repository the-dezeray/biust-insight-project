'use client';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MaintainerCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-3 right-3 bg-white rounded-md shadow-md p-2 flex items-center gap-2 border border-gray-200 text-xs group hover:shadow-lg transition-all duration-300 ">
        <Avatar className="size-6 ring-2 ring-teal-500/20 group-hover:ring-teal-500/40 transition-all duration-300">
          <AvatarImage src="https://github.com/the-dezeray.png" alt="@shadcn" />
          <AvatarFallback className="text-xs bg-teal-50 text-teal-700">CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-600 group-hover:text-teal-700 transition-colors duration-300">
            maintained by the Dezeray
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-1 py-0.5 bg-teal-600/90 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 hover:shadow-teal-600/40 text-xs rounded transition-all duration-300 hover:scale-105 hover:animate-none"
            >
              {'>'} Contact
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="size-20 ring-4 ring-teal-500/30">
                <AvatarImage src="https://github.com/the-dezeray.png" alt="@shadcn" />
                <AvatarFallback className="text-2xl bg-teal-50 text-teal-700">CN</AvatarFallback>
              </Avatar>
            </div>
            <DialogTitle className="text-teal-700 text-xl text-center">About Me</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center text-gray-600">
            <p className="text-sm leading-relaxed text-center">
              A BIUST nerd who lives and breathes code. I like code, I dream of code,
              and I definitely don't like people who use Windows...
            </p>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2 text-center">Get in touch:</p>
              <div className="flex justify-center">
                <a
                  href="mailto:chingwaru.desiree@gmail.com"
                  className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300 text-sm"
                >
                  chingwaru.desiree@gmail.com
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}