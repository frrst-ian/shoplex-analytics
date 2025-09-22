
// This is a mock data service.
// In a real application, this would connect to Supabase.

const MOCK_PRODUCTS = ["Quantum Laptop", "Astro Smartphone", "Nova Tablet", "Galaxy Projector", "Orion Headphones"];
const MOCK_CUSTOMERS = ["Alex Reyes", "Ben Santos", "Chris Villanueva", "Dana Gomez", "Eli Cruz", "Faye Mercado", "Gabe Lorenzo", "Hannah Ignacio", "Ian David", "Jane Garcia"];
const MOCK_CAMPAIGNS = ["Summer Sale '24", "Cyber Monday", "11.11 Big Sale", "Holiday Deals"];
const MOCK_PAYMENT_METHODS = ["Credit Card", "GCash", "PayPal", "Bank Transfer", "COD"];
const MOCK_PLATFORMS = ["Website", "Mobile App", "Physical Store"];
const MOCK_PAYMENT_STATUS = ["Paid", "Pending", "Failed"];

const generateRandomSalesData = (queryTitle: string): any[] => {
  switch (queryTitle) {
    case "Top Selling Products":
      return MOCK_PRODUCTS.map(p => ({
        product_name: p,
        total_units_sold: Math.floor(Math.random() * 500) + 50,
        total_revenue: Math.floor(Math.random() * 50000) + 10000,
      })).sort((a, b) => b.total_revenue - a.total_revenue);

    case "Daily Revenue Trends":
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          order_date: date.toISOString().split('T')[0],
          daily_revenue: Math.floor(Math.random() * 20000) + 5000,
          orders_count: Math.floor(Math.random() * 100) + 20,
        };
      });

    case "Payments by Method":
      return MOCK_PAYMENT_METHODS.map(m => ({
        payment_method: m,
        transactions: Math.floor(Math.random() * 1000) + 200,
        revenue: Math.floor(Math.random() * 80000) + 15000,
      }));
    
    case "Top 10 Customers by Spending":
       return MOCK_CUSTOMERS.map(c => ({
        customer_name: c,
        total_spent: Math.floor(Math.random() * 5000) + 1000,
        orders_made: Math.floor(Math.random() * 20) + 2,
      })).sort((a,b) => b.total_spent - a.total_spent);

    case "Campaign Performance":
      return MOCK_CAMPAIGNS.map(c => ({
        campaign_name: c,
        campaign_revenue: Math.floor(Math.random() * 100000) + 20000,
        total_clicks: Math.floor(Math.random() * 5000) + 1000,
      }));

    case "Revenue by Platform":
      return MOCK_PLATFORMS.map(p => ({
        platform: p,
        avg_order_value: (Math.random() * 150 + 50).toFixed(2),
        total_revenue: Math.floor(Math.random() * 150000) + 50000,
      }));

    case "Orders by Payment Status":
      return MOCK_PAYMENT_STATUS.map(s => ({
        payment_status: s,
        orders: Math.floor(Math.random() * 2000) + (s === 'Paid' ? 1000 : 100),
        total_value: Math.floor(Math.random() * 200000) + (s === 'Paid' ? 100000 : 10000),
      }));

    default:
      return [];
  }
};


export const fetchData = (sql: string, queryTitle: string): Promise<any[]> => {
  console.log("Executing Query for:", queryTitle);

  return new Promise(resolve => {
    setTimeout(() => {
      if (sql.includes("sales_data")) {
        resolve(generateRandomSalesData(queryTitle));
      } else if (queryTitle === "Sample Inventory Levels") {
        resolve([
            { location: 'Manila Warehouse', category: 'Electronics', stock_count: 540 },
            { location: 'Cebu Distribution', category: 'Home & Kitchen', stock_count: 320 },
            { location: 'Davao Service Center', category: 'Fashion & Clothing', stock_count: 120 },
        ]);
      } else if (queryTitle === "Sample Ticket Resolution") {
        resolve([
            { branch: 'Quezon City', tickets_open: 85, tickets_resolved: 420 },
            { branch: 'Iloilo Hub', tickets_open: 60, tickets_resolved: 390 },
        ]);
      } else if (queryTitle === "Mock Profit Margins by Department") {
        resolve([
           { department: 'Sales & Marketing', revenue: 1250000, expenses: 870000, profit: 380000 },
           { department: 'Inventory', revenue: 980000, expenses: 700000, profit: 280000 },
           { department: 'Customer Service', revenue: 320000, expenses: 210000, profit: 110000 },
        ]);
      } else {
        resolve([]);
      }
    }, 500 + Math.random() * 1000); // Simulate network delay
  });
};
