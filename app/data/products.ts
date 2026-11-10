export interface Product {
    id: number;
    name: string;
    desc: string;
    image: string;
    brand: string;
    type: string;
    size: string;
    price: number;
}

export const productsData: Product[] = [
    {
        id: 1,
        name: "Pepsi Prebiotic Cola Cherry Vanilla",
        desc: "Refreshing Cola with a Smooth Cherry Twist",
        image: "/images/pepsi-can1.png",
        brand: "pepsi",
        type: "cherry",
        size: "330ml",
        price: 2.99,
    },
    {
        id: 2,
        name: "Pepsi",
        desc: "Moments Worth Savouring",
        image: "/images/pepsi-can2.png",
        brand: "pepsi",
        type: "regular",
        size: "330ml",
        price: 1.99,
    },
    {
        id: 3,
        name: "Pepsi Zero Sugar",
        desc: "Zero Sugar , All the Pepsi Taste",
        image: "/images/pepsi-can3.png",
        brand: "pepsi-zero-sugar",
        type: "zero-sugar",
        size: "330ml",
        price: 1.99,
    },
    {
        id: 4,
        name: "Diet Pepsi",
        desc: "Light, Crisp and Refreshing Taste",
        image: "/images/pepsi-can4.png",
        brand: "diet-pepsi",
        type: "diet",
        size: "330ml",
        price: 1.89,
    },
    {
        id: 5,
        name: "Pepsi Wild Cherry",
        desc: "Bold Cola Taste with Sweet Wild Cherry Flavor",
        image: "/images/pepsi-can5.png",
        brand: "pepsi-wild-cherry",
        type: "cherry",
        size: "330ml",
        price: 2.19,
    },
    {
        id: 6,
        name: "Pepsi Real Sugar",
        desc: "Made with Real Cane Sugar for Pure Taste",
        image: "/images/pepsi-can6.png",
        brand: "pepsi",
        type: "regular",
        size: "330ml",
        price: 2.49,
    },
];
