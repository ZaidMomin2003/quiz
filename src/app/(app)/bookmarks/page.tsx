// src/app/(app)/bookmarks/page.tsx
'use client';
import { useState, useEffect } from 'react';
import type { BookmarkItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks).sort((a: BookmarkItem, b: BookmarkItem) => b.timestamp - a.timestamp));
    }
    setHydrated(true);
  }, []);

  const handleRemoveBookmark = (timestamp: number) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.timestamp !== timestamp
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };
  
  if (!hydrated) {
      return null;
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Bookmarks</h1>
      <Card>
        <CardHeader>
          <CardTitle>Saved Explanations</CardTitle>
          <CardDescription>
            Review the explanations you've saved from your learning sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookmarks.length > 0 ? (
            <Accordion type="multiple" className="w-full space-y-4">
              {bookmarks.map((item) => (
                <AccordionItem
                  key={item.timestamp}
                  value={`item-${item.timestamp}`}
                  className="border rounded-lg"
                >
                    <div className="p-4">
                        <AccordionTrigger className="w-full text-left hover:no-underline p-0">
                           <div className="flex flex-col gap-2 w-full pr-4">
                                <p className="font-semibold">{item.question}</p>
                                <Badge variant="outline" className="w-fit">{item.topic}</Badge>
                           </div>
                        </AccordionTrigger>
                    </div>
                  <AccordionContent>
                    <div className="px-4 pb-4">
                        <div className="p-4 bg-accent/50 rounded-lg space-y-4">
                             <div>
                                <h4 className="font-semibold text-sm mb-1">Correct Answer</h4>
                                <p className="text-sm text-muted-foreground">{item.correctAnswer}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Explanation</h4>
                                <p className="text-sm text-muted-foreground">{item.explanation}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveBookmark(item.timestamp)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground py-16 flex flex-col items-center gap-4">
                <Bookmark className="h-12 w-12 text-muted-foreground/50"/>
                <p>You haven't bookmarked any explanations yet.</p>
                <p className="text-sm">You can save explanations during a "Learn" quiz session.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
