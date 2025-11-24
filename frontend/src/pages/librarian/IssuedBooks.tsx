// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';
//
// const IssuedBooks = () => {
//   const issuedBooks = [
//     { id: 1, bookTitle: 'The Great Gatsby', userName: 'John Doe', issueDate: '2024-12-01', dueDate: '2024-12-25', status: 'active' },
//     { id: 2, bookTitle: '1984', userName: 'Jane Smith', issueDate: '2024-11-28', dueDate: '2024-12-28', status: 'active' },
//     { id: 3, bookTitle: 'To Kill a Mockingbird', userName: 'Bob Johnson', issueDate: '2024-11-30', dueDate: '2024-12-30', status: 'active' },
//     { id: 4, bookTitle: 'Moby Dick', userName: 'Alice Williams', issueDate: '2024-11-15', dueDate: '2024-12-10', status: 'overdue' },
//     { id: 5, bookTitle: 'War and Peace', userName: 'Charlie Brown', issueDate: '2024-11-20', dueDate: '2024-12-15', status: 'overdue' },
//   ];
//
//   const handleReturn = (bookTitle: string, userName: string) => {
//     toast.success(`Returned: ${bookTitle} by ${userName}`);
//   };
//
//   const isOverdue = (dueDate: string) => {
//     return new Date(dueDate) < new Date();
//   };
//
//   return (
//     <div className="p-8 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Issued Books</h1>
//         <p className="text-muted-foreground mt-1">Manage currently issued books</p>
//       </div>
//
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             <span>Currently Issued</span>
//             <Badge variant="secondary">{issuedBooks.length} books</Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Book Title</TableHead>
//                 <TableHead>Issued To</TableHead>
//                 <TableHead>Issue Date</TableHead>
//                 <TableHead>Due Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {issuedBooks.map((book) => (
//                 <TableRow key={book.id}>
//                   <TableCell className="font-medium">{book.bookTitle}</TableCell>
//                   <TableCell>{book.userName}</TableCell>
//                   <TableCell className="text-muted-foreground">{book.issueDate}</TableCell>
//                   <TableCell className={isOverdue(book.dueDate) ? 'text-destructive font-medium' : 'text-muted-foreground'}>
//                     {book.dueDate}
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={book.status === 'overdue' ? 'destructive' : 'default'}>
//                       {book.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       size="sm"
//                       onClick={() => handleReturn(book.bookTitle, book.userName)}
//                     >
//                       Process Return
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
//
// export default IssuedBooks;


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface IssuedBook {
  id: number;
  bookName: string;
  userName: string;
  issueDate: string;
  dueDate: string;
  status: string; // active / overdue
}

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Load issued books from backend
  const loadIssuedBooks = async () => {
    try {
      const data = await apiFetch("/librarian/all-issued");
      setIssuedBooks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load issued books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssuedBooks();
  }, []);

  // Handle book return
  const handleReturn = async (id: number) => {
    try {
      await apiFetch(`/librarian/return/${id}`, {
        method: "POST",
      });

      toast.success("Book return processed successfully");
      loadIssuedBooks(); // refresh after return
    } catch (err) {
      console.error(err);
      toast.error("Failed to process return");
    }
  };

  if (loading) {
    return (
        <div className="p-8 text-center text-lg font-semibold">
          Loading issued books...
        </div>
    );
  }

  return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issued Books</h1>
          <p className="text-muted-foreground mt-1">
            Manage currently issued and overdue books
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Currently Issued</span>
              <Badge variant="secondary">{issuedBooks.length} books</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>Issued To</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {issuedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.bookName}</TableCell>
                      <TableCell>{book.userName}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {book.issueDate}
                      </TableCell>

                      <TableCell
                          className={
                            isOverdue(book.dueDate)
                                ? "text-destructive font-semibold"
                                : "text-muted-foreground"
                          }
                      >
                        {book.dueDate}
                      </TableCell>

                      <TableCell>
                        <Badge
                            variant={isOverdue(book.dueDate) ? "destructive" : "default"}
                        >
                          {isOverdue(book.dueDate) ? "overdue" : "active"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Button
                            size="sm"
                            onClick={() => handleReturn(book.id)}
                        >
                          Process Return
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}

                {issuedBooks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No issued books found.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>

        </Card>
      </div>
  );
};

export default IssuedBooks;
