import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookMarked, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface MyBook {
  id: number;
  bookName: string;
  authorName: string;
  issueDate: string;
  dueDate: string;
  status: string;
}

const MyBooks = () => {
  const [books, setBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMyBooks = async () => {
    try {
      const response = await apiFetch("/user/my-books");
      setBooks(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (id: number) => {
    try {
      await apiFetch(`/user/renew/${id}`, { method: "POST" });
      toast.success("Renewal request sent!");
      loadMyBooks();
    } catch {
      toast.error("Could not send renewal request");
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    loadMyBooks();
  }, []);

  if (loading) {
    return (
        <div className="p-8 text-center text-lg font-semibold">
          Loading your books...
        </div>
    );
  }

  return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Books</h1>
          <p className="text-muted-foreground mt-1">
            Books currently borrowed by you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {books.map((book) => {
            const daysLeft = getDaysUntilDue(book.dueDate);
            const isOverdueSoon = daysLeft <= 3;

            return (
                <Card key={book.id} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <BookMarked className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{book.bookName}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {book.authorName}
                          </p>
                        </div>
                      </div>

                      <Badge variant={book.status === "ACTIVE" ? "default" : "secondary"}>
                        {book.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Issued: </span>
                        <span className="font-medium">{book.issueDate}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Due: </span>
                        <span
                            className={`font-medium ${
                                isOverdueSoon ? "text-destructive" : ""
                            }`}
                        >
                      {book.dueDate}
                    </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {isOverdueSoon && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <span
                            className={
                              isOverdueSoon
                                  ? "text-destructive font-medium"
                                  : "text-muted-foreground"
                            }
                        >
                      {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                    </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button variant="outline" onClick={() => handleRenew(book.id)}>
                        Request Renewal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            );
          })}

          {books.length === 0 && (
              <p className="text-center text-muted-foreground py-6">
                You have not borrowed any books yet.
              </p>
          )}
        </div>
      </div>
  );
};

export default MyBooks;
