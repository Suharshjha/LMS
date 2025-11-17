import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked, Search, Clock, CheckCircle } from 'lucide-react';

const UserDashboard = () => {
  const stats = [
    { title: 'Books Borrowed', value: '3', icon: BookMarked, color: 'text-primary' },
    { title: 'Pending Requests', value: '1', icon: Clock, color: 'text-destructive' },
    { title: 'Books Returned', value: '12', icon: CheckCircle, color: 'text-accent' },
    { title: 'Available Books', value: '5,432', icon: Search, color: 'text-secondary' },
  ];

  const myBooks = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', dueDate: '2024-12-25', status: 'active' },
    { title: '1984', author: 'George Orwell', dueDate: '2024-12-28', status: 'active' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', dueDate: '2024-12-30', status: 'active' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Check your borrowed books</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Currently Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myBooks.map((book, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {book.dueDate}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-accent text-accent-foreground rounded">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth">
                Search Books
              </button>
              <button className="w-full p-3 text-left bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-smooth">
                View My Requests
              </button>
              <button className="w-full p-3 text-left bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-smooth">
                Renew Books
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Reading History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">The Catcher in the Rye</p>
                <p className="text-sm text-muted-foreground">Returned on 2024-11-15</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Pride and Prejudice</p>
                <p className="text-sm text-muted-foreground">Returned on 2024-11-10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
