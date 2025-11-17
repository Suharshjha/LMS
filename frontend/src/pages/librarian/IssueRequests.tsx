import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const IssueRequests = () => {
  const requests = [
    { id: 1, bookTitle: 'The Great Gatsby', userName: 'John Doe', userEmail: 'john@example.com', requestDate: '2024-12-15', status: 'pending' },
    { id: 2, bookTitle: '1984', userName: 'Jane Smith', userEmail: 'jane@example.com', requestDate: '2024-12-14', status: 'pending' },
    { id: 3, bookTitle: 'To Kill a Mockingbird', userName: 'Bob Johnson', userEmail: 'bob@example.com', requestDate: '2024-12-13', status: 'pending' },
    { id: 4, bookTitle: 'Pride and Prejudice', userName: 'Alice Williams', userEmail: 'alice@example.com', requestDate: '2024-12-12', status: 'pending' },
  ];

  const handleApprove = (bookTitle: string, userName: string) => {
    toast.success(`Approved: ${bookTitle} for ${userName}`);
  };

  const handleReject = (bookTitle: string, userName: string) => {
    toast.error(`Rejected: ${bookTitle} for ${userName}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Issue Requests</h1>
        <p className="text-muted-foreground mt-1">Review and approve book issue requests</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Pending Requests</span>
            <Badge variant="secondary">{requests.length} pending</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.bookTitle}</TableCell>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell className="text-muted-foreground">{request.userEmail}</TableCell>
                  <TableCell className="text-muted-foreground">{request.requestDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => handleApprove(request.bookTitle, request.userName)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleReject(request.bookTitle, request.userName)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueRequests;
