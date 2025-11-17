import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

const ManageLibrarians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const librarians = [
    { id: 1, name: 'Sarah Connor', email: 'sarah@library.com', phone: '+1234567800', assignedSection: 'Fiction', status: 'active' },
    { id: 2, name: 'Michael Scott', email: 'michael@library.com', phone: '+1234567801', assignedSection: 'Non-Fiction', status: 'active' },
    { id: 3, name: 'Emma Watson', email: 'emma@library.com', phone: '+1234567802', assignedSection: 'Children', status: 'active' },
    { id: 4, name: 'David Miller', email: 'david@library.com', phone: '+1234567803', assignedSection: 'Reference', status: 'inactive' },
  ];

  const filteredLibrarians = librarians.filter(librarian =>
    librarian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    librarian.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Librarians</h1>
          <p className="text-muted-foreground mt-1">Add and manage library staff</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Librarian
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>All Librarians</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Assigned Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLibrarians.map((librarian) => (
                <TableRow key={librarian.id}>
                  <TableCell className="font-medium">{librarian.name}</TableCell>
                  <TableCell className="text-muted-foreground">{librarian.email}</TableCell>
                  <TableCell className="text-muted-foreground">{librarian.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{librarian.assignedSection}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={librarian.status === 'active' ? 'default' : 'secondary'}>
                      {librarian.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
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

export default ManageLibrarians;
