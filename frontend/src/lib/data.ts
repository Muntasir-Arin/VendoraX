export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    condition: string;
    image: string;
  }
  
  export interface User {
    email: string;
    password: string;
  }
    
export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro Max',
    category: 'Electronics',
    price: 1568,
    description: 'Latest iPhone 13 Pro Max, bought from the Apple store. Still in perfect condition, under warranty.',
    condition: 'New',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    id: '2',
    name: 'iPhone 13 Pro',
    category: 'Electronics',
    price: 395,
    description: 'iPhone 13 Pro with slight wear and tear. All features working perfectly.',
    condition: 'Used',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    id: '3',
    name: 'MacBook Pro M1',
    category: 'Electronics',
    price: 1299,
    description: 'M1 MacBook Pro with 16GB RAM and 512GB storage. Perfect for developers.',
    condition: 'New',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    category: 'Electronics',
    price: 999,
    description: 'Latest iPad Pro with M1 chip. Perfect for digital artists.',
    condition: 'New',
    image: '/placeholder.svg?height=400&width=400'
  }
];

