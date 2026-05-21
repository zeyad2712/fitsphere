import gym1 from '../assets/gyms/gym1.png';
import gym2 from '../assets/gyms/gym2.png';
import gym3 from '../assets/gyms/gym3.png';

export const gymsData = [
    {
        id: 1,
        name: "FitSphere Elite",
        location: "Downtown, Cairo",
        coords: [30.0444, 31.2357],
        rating: 4.9,
        reviews: 245,
        price: "300 EGP/Session",
        images: [
            gym1,
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200"
        ],
        features: ["24/7 Access", "Personal Training", "Sauna"],
        address: "123 Fitness Ave, Downtown Metro",
        openUntil: "10:00 PM",
        amenities: [
            { id: 1, name: "Olympic Pool", icon: "Waves" },
            { id: 2, name: "Luxury Sauna", icon: "Thermometer" },
            { id: 3, name: "Cardio Zone", icon: "Activity" },
            { id: 4, name: "Private Showers", icon: "ShowerHead" },
            { id: 5, name: "Juice Bar", icon: "CupSoda" },
            { id: 6, name: "High-speed WiFi", icon: "Wifi" },
            { id: 7, name: "Towel Service", icon: "Shirt" },
            { id: 8, name: "MMA Area", icon: "Dumbbell" }
        ],
        recentReviews: [
            {
                id: 1,
                author: "Marcus Chen",
                date: "2 days ago",
                rating: 5,
                comment: "Incredible facilities and top-tier equipment. The personal trainers here really know their stuff and helped me hit my PR within 3 months. Cleanest locker rooms I've ever seen!"
            },
            {
                id: 2,
                author: "Sarah Jenkins",
                date: "1 week ago",
                rating: 5,
                comment: "The morning HIIT classes are intense but so rewarding. A bit crowded during peak hours (5-7pm) but otherwise a fantastic environment for athletes."
            }
        ]
    },
    {
        id: 2,
        name: "PowerHouse Gym",
        location: "Zamalek, Cairo",
        coords: [30.0633, 31.2222],
        rating: 4.7,
        reviews: 189,
        price: "250 EGP/Session",
        images: [
            gym2,
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200"
        ],
        features: ["MMA Area", "Pool", "Cafe"],
        address: "45 Nile View St, Zamalek",
        openUntil: "11:00 PM",
        amenities: [
            { id: 1, name: "MMA Cage", icon: "Dumbbell" },
            { id: 2, name: "Olympic Pool", icon: "Waves" },
            { id: 3, name: "Protein Cafe", icon: "CupSoda" }
        ],
        recentReviews: []
    },
    {
        id: 3,
        name: "Urban Iron",
        location: "Maadi, Cairo",
        coords: [29.9602, 31.2569],
        rating: 4.8,
        reviews: 312,
        price: "200 EGP/Session",
        images: [
            gym3,
            "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1200",
            "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200"
        ],
        features: ["Crossfit", "Dumbbells up to 100kg", "Recovery Zone"],
        address: "78 Street 9, Maadi",
        openUntil: "9:00 PM",
        amenities: [
            { id: 1, name: "Crossfit Box", icon: "Activity" },
            { id: 2, name: "Recovery Lounge", icon: "Thermometer" }
        ],
        recentReviews: []
    },
    {
        id: 4,
        name: "Zen Studio",
        location: "New Cairo",
        coords: [30.0299, 31.4913],
        rating: 4.9,
        reviews: 156,
        price: "150 EGP/Session",
        images: [
            gym1,
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200"
        ],
        features: ["Yoga", "Pilates", "Smoothie Bar"],
        address: "Boutique Hub, New Cairo",
        openUntil: "8:00 PM",
        amenities: [
            { id: 1, name: "Yoga Deck", icon: "Activity" },
            { id: 2, name: "Smoothie Bar", icon: "CupSoda" }
        ],
        recentReviews: []
    }
];
