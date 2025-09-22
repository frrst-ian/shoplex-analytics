import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Fixed to use import.meta.env and correct variable names
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: any = null;

// Initialize Supabase client if credentials are available
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase credentials missing:', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
}

// Mock data for non-sales departments
const MOCK_PRODUCTS = ["Quantum Laptop", "Astro Smartphone", "Nova Tablet", "Galaxy Projector", "Orion Headphones"];
const MOCK_CUSTOMERS = ["Alex Reyes", "Ben Santos", "Chris Villanueva", "Dana Gomez", "Eli Cruz", "Faye Mercado", "Gabe Lorenzo", "Hannah Ignacio", "Ian David", "Jane Garcia"];
const MOCK_CAMPAIGNS = ["Summer Sale '24", "Cyber Monday", "11.11 Big Sale", "Holiday Deals"];
const MOCK_PAYMENT_METHODS = ["Credit Card", "GCash", "PayPal", "Bank Transfer", "COD"];
const MOCK_PLATFORMS = ["Website", "Mobile App", "Physical Store"];
const MOCK_PAYMENT_STATUS = ["Paid", "Pending", "Failed"];

// Supabase RPC function mappings
const SUPABASE_RPC_MAP: { [key: string]: string } = {
  "Top Selling Products": "get_top_products_by_revenue",
  "Daily Revenue Trends": "get_daily_revenue_trends",
  "Payments by Method": "get_payments_by_method",
  "Top 10 Customers by Spending": "get_top_customers_by_spending",
  "Campaign Performance": "get_campaign_performance",
  "Revenue by Platform": "get_revenue_by_platform",
  "Orders by Payment Status": "get_orders_by_payment_status"
};

const generateMockSalesData = (queryTitle: string): any[] => {
  switch (queryTitle) {
    case "Top Selling Products":
      return [
        { product_name: "Electric Toothbrush", total_units_sold: 27, total_revenue: 1350.00 },
        { product_name: "Whitening Gel", total_units_sold: 40, total_revenue: 600.00 },
        { product_name: "Mouthwash", total_units_sold: 81, total_revenue: 567.00 },
        { product_name: "Kids Toothpaste", total_units_sold: 43, total_revenue: 172.00 },
        { product_name: "Toothbrush", total_units_sold: 28, total_revenue: 154.00 },
        { product_name: "Toothpaste", total_units_sold: 30, total_revenue: 105.00 },
        { product_name: "Floss", total_units_sold: 50, total_revenue: 100.00 }
      ];

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
       return MOCK_CUSTOMERS.slice(0, 10).map(c => ({
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

const fetchFromSupabase = async (queryTitle: string): Promise<any[]> => {
  if (!supabase) {
    console.log("Supabase not configured, using mock data for:", queryTitle);
    return generateMockSalesData(queryTitle);
  }

  const rpcFunction = SUPABASE_RPC_MAP[queryTitle];
  if (!rpcFunction) {
    console.log("No RPC function mapped for:", queryTitle);
    return generateMockSalesData(queryTitle);
  }

  // Only call Supabase for the one RPC function that exists
  if (queryTitle !== "Top Selling Products") {
    console.log("Using mock data for non-implemented RPC:", queryTitle);
    return generateMockSalesData(queryTitle);
  }

  try {
    console.log("Calling Supabase RPC:", rpcFunction);
    console.log("Testing direct table access first...");
    
    // Test direct table access
    const tableTest = await supabase.from('sales_data').select('*').limit(1);
    console.log("Direct table access test:", tableTest);
    
    const result = await supabase.rpc(rpcFunction, {});
    console.log("Raw Supabase response:", result);
    
    const { data, error } = result;
    
    if (error) {
      console.error("Supabase RPC error:", error);
      return generateMockSalesData(queryTitle);
    }

    console.log("🎉 SUCCESS: get_top_products_by_revenue returned data:", data);
    console.log("Data type:", typeof data, "Is array:", Array.isArray(data), "Length:", data?.length);
    
    // If no data returned, use mock data
    if (!data || data.length === 0) {
      console.log("No data from Supabase, using mock data for:", queryTitle);
      return generateMockSalesData(queryTitle);
    }

    return data;
  } catch (err) {
    console.error("Error calling Supabase:", err);
    return generateMockSalesData(queryTitle);
  }
};

export const fetchData = async (sql: string, queryTitle: string): Promise<any[]> => {
  console.log("Executing Query for:", queryTitle);

  // Sales queries - try Supabase first, fallback to mock
  if (sql.includes("sales_data") || SUPABASE_RPC_MAP[queryTitle]) {
    return await fetchFromSupabase(queryTitle);
  }

  // Non-sales queries - use mock data
  return new Promise(resolve => {
    setTimeout(() => {
      if (queryTitle === "Sample Inventory Levels") {
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
    }, 500 + Math.random() * 1000);
  });
};