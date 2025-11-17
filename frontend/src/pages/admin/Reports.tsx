import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const issuedBooks = [
    { id: 1, bookTitle: 'The Great Gatsby', userName: 'John Doe', issueDate: '2024-12-01', dueDate: '2024-12-25' },
    { id: 2, bookTitle: '1984', userName: 'Jane Smith', issueDate: '2024-11-28', dueDate: '2024-12-28' },
    { id: 3, bookTitle: 'To Kill a Mockingbird', userName: 'Bob Johnson', issueDate: '2024-11-30', dueDate: '2024-12-30' },
  ];

  const overdueBooks = [
    { id: 1, bookTitle: 'Moby Dick', userName: 'Alice Williams', issueDate: '2024-11-15', dueDate: '2024-12-10', daysOverdue: 7 },
    { id: 2, bookTitle: 'War and Peace', userName: 'Charlie Brown', issueDate: '2024-11-20', dueDate: '2024-12-15', daysOverdue: 2 },
  ];

  const popularBooks = [
    { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', issueCount: 45, author: 'J.K. Rowling' },
    { id: 2, title: 'The Great Gatsby', issueCount: 38, author: 'F. Scott Fitzgerald' },
    { id: 3, title: '1984', issueCount: 35, author: 'George Orwell' },
    { id: 4, title: 'To Kill a Mockingbird', issueCount: 32, author: 'Harper Lee' },
    { id: 5, title: 'Pride and Prejudice', issueCount: 28, author: 'Jane Austen' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">View library statistics and reports</p>
      </div>

      <Tabs defaultValue="issued" className="space-y-6">
        <TabsList>
          <TabsTrigger value="issued">Issued Books</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Books</TabsTrigger>
          <TabsTrigger value="popular">Popular Books</TabsTrigger>
        </TabsList>

        <TabsContent value="issued">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Currently Issued Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Issued To</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issuedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.bookTitle}</TableCell>
                      <TableCell>{book.userName}</TableCell>
                      <TableCell className="text-muted-foreground">{book.issueDate}</TableCell>
                      <TableCell className="text-muted-foreground">{book.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Overdue Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Borrowed By</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.bookTitle}</TableCell>
                      <TableCell>{book.userName}</TableCell>
                      <TableCell className="text-muted-foreground">{book.issueDate}</TableCell>
                      <TableCell className="text-destructive">{book.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{book.daysOverdue} days</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Most Popular Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Total Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularBooks.map((book, index) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell className="text-muted-foreground">{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.issueCount} issues</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
