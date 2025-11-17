import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BookMarked, CheckCircle, Clock } from 'lucide-react';

const LibrarianDashboard = () => {
  const stats = [
    { title: 'Total Books', value: '5,678', icon: BookOpen, color: 'text-primary' },
    { title: 'Pending Requests', value: '23', icon: Clock, color: 'text-destructive' },
    { title: 'Books Issued', value: '234', icon: BookMarked, color: 'text-secondary' },
    { title: 'Returned Today', value: '18', icon: CheckCircle, color: 'text-accent' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Librarian Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage books and issue requests</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Pending Issue Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">The Great Gatsby</p>
                    <p className="text-sm text-muted-foreground">Requested by: John Doe</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-md hover:opacity-90">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-destructive text-destructive-foreground text-sm rounded-md hover:opacity-90">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth">
                Add New Book
              </button>
              <button className="w-full p-3 text-left bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-smooth">
                View All Requests
              </button>
              <button className="w-full p-3 text-left bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-smooth">
                Process Returns
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
