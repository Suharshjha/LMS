// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { CheckCircle, XCircle } from 'lucide-react';
// import { toast } from 'sonner';
//
// const IssueRequests = () => {
//   const requests = [
//     { id: 1, bookTitle: 'The Great Gatsby', userName: 'John Doe', userEmail: 'john@example.com', requestDate: '2024-12-15', status: 'pending' },
//     { id: 2, bookTitle: '1984', userName: 'Jane Smith', userEmail: 'jane@example.com', requestDate: '2024-12-14', status: 'pending' },
//     { id: 3, bookTitle: 'To Kill a Mockingbird', userName: 'Bob Johnson', userEmail: 'bob@example.com', requestDate: '2024-12-13', status: 'pending' },
//     { id: 4, bookTitle: 'Pride and Prejudice', userName: 'Alice Williams', userEmail: 'alice@example.com', requestDate: '2024-12-12', status: 'pending' },
//   ];
//
//   const handleApprove = (bookTitle: string, userName: string) => {
//     toast.success(`Approved: ${bookTitle} for ${userName}`);
//   };
//
//   const handleReject = (bookTitle: string, userName: string) => {
//     toast.error(`Rejected: ${bookTitle} for ${userName}`);
//   };
//
//   return (
//     <div className="p-8 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Issue Requests</h1>
//         <p className="text-muted-foreground mt-1">Review and approve book issue requests</p>
//       </div>
//
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             <span>Pending Requests</span>
//             <Badge variant="secondary">{requests.length} pending</Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Book Title</TableHead>
//                 <TableHead>Requested By</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Request Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {requests.map((request) => (
//                 <TableRow key={request.id}>
//                   <TableCell className="font-medium">{request.bookTitle}</TableCell>
//                   <TableCell>{request.userName}</TableCell>
//                   <TableCell className="text-muted-foreground">{request.userEmail}</TableCell>
//                   <TableCell className="text-muted-foreground">{request.requestDate}</TableCell>
//                   <TableCell>
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         className="gap-2"
//                         onClick={() => handleApprove(request.bookTitle, request.userName)}
//                       >
//                         <CheckCircle className="h-4 w-4" />
//                         Approve
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         className="gap-2"
//                         onClick={() => handleReject(request.bookTitle, request.userName)}
//                       >
//                         <XCircle className="h-4 w-4" />
//                         Reject
//                       </Button>
//                     </div>
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
// export default IssueRequests;


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface IssueRequest {
  id: number;
  bookName: string;
  userName: string;
  userEmail: string;
  requestDate: string;
  status: string;
}

const IssueRequests = () => {
  const [requests, setRequests] = useState<IssueRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending requests from backend
  const loadRequests = async () => {
    try {
      const data = await apiFetch("/librarian/pending-requests");
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // APPROVE request
  const handleApprove = async (id: number) => {
    try {
      await apiFetch(`/librarian/approve/${id}`, { method: "POST" });
      toast.success("Request Approved");
      loadRequests(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request");
    }
  };

  // REJECT request
  const handleReject = async (id: number) => {
    try {
      await apiFetch(`/librarian/reject/${id}`, { method: "POST" });
      toast.error("Request Rejected");
      loadRequests(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  if (loading) {
    return (
        <div className="p-8 text-lg font-semibold text-center">
          Loading requests...
        </div>
    );
  }

  return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Issue Requests</h1>
          <p className="text-muted-foreground mt-1">Review and approve issue requests</p>
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
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.bookName}</TableCell>
                      <TableCell>{req.userName}</TableCell>
                      <TableCell>{req.userEmail}</TableCell>
                      <TableCell>{req.requestDate}</TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                              size="sm"
                              className="gap-2"
                              onClick={() => handleApprove(req.id)}
                          >
                            <CheckCircle className="h-4 w-4" /> Approve
                          </Button>

                          <Button
                              size="sm"
                              variant="destructive"
                              className="gap-2"
                              onClick={() => handleReject(req.id)}
                          >
                            <XCircle className="h-4 w-4" /> Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                ))}

                {requests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No pending requests.
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

export default IssueRequests;
