import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarked, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const MyBooks = () => {
  const myBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', issueDate: '2024-12-01', dueDate: '2024-12-25', status: 'active' },
    { id: 2, title: '1984', author: 'George Orwell', issueDate: '2024-11-28', dueDate: '2024-12-28', status: 'active' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', issueDate: '2024-11-30', dueDate: '2024-12-30', status: 'active' },
  ];

  const handleRenew = (bookTitle: string) => {
    toast.success(`Renewal request sent for: ${bookTitle}`);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Books</h1>
        <p className="text-muted-foreground mt-1">Books currently borrowed by you</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myBooks.map((book) => {
          const daysUntilDue = getDaysUntilDue(book.dueDate);
          const isOverdueSoon = daysUntilDue <= 3;

          return (
            <Card key={book.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <BookMarked className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{book.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                    </div>
                  </div>
                  <Badge variant={book.status === 'active' ? 'default' : 'secondary'}>
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
                    <span className={`font-medium ${isOverdueSoon ? 'text-destructive' : ''}`}>
                      {book.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {isOverdueSoon && <AlertCircle className="h-4 w-4 text-destructive" />}
                    <span className={isOverdueSoon ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                      {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleRenew(book.title)}
                  >
                    Request Renewal
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyBooks;
