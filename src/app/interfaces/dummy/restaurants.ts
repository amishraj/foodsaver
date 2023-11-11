import { Restaurant } from "../restaurant";

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    title: 'Cafe Amore',
    address: '123 Main St, Washington, D.C.',
    phone: '(202) 555-1234',
    email: 'test@test.com',
    rating: '4.5',
    meals: [

      {
        "title": "Grilled Chicken Salad",
        "description": "A healthy and delicious salad with grilled chicken breast, fresh vegetables, and a tangy vinaigrette.",
        "zipcode": "12345",
        "calories": 400,
        "rating": 4.5,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Margherita Pizza",
        "description": "Classic Margherita pizza with fresh tomatoes, mozzarella, basil, and a thin crust.",
        "zipcode": "56789",
        "calories": 600,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Vegetable Stir-Fry",
        "description": "A flavorful vegetable stir-fry with broccoli, bell peppers, carrots, and tofu in a savory sauce.",
        "zipcode": "67890",
        "calories": 350,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Salmon Teriyaki",
        "description": "Grilled salmon glazed with teriyaki sauce, served with steamed rice and vegetables.",
        "zipcode": "23456",
        "calories": 450,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Quinoa Salad",
        "description": "A nutritious quinoa salad with mixed greens, cherry tomatoes, cucumber, and feta cheese.",
        "zipcode": "78901",
        "calories": 300,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 2,
    title: 'The Capital Grill',
    address: '456 Elm St, Washington, D.C.',
    phone: '(202) 555-5678',
    email: 'test@test.com',
    rating: '4.8',
    meals: [{
      "title": "Chicken Alfredo Pasta",
      "description": "Creamy Alfredo pasta with grilled chicken, mushrooms, and parmesan cheese.",
      "zipcode": "34567",
      "calories": 550,
      "rating": 4.6,
      "image": "https://via.placeholder.com/200",
      "glutenFree": false,
      "vegan": false,
      "vegetarian": false
    },
    {
      "title": "Mango Avocado Salsa",
      "description": "Fresh salsa with diced mango, avocado, red onion, cilantro, and lime juice.",
      "zipcode": "89012",
      "calories": 200,
      "rating": 4.1,
      "image": "https://via.placeholder.com/200",
      "glutenFree": true,
      "vegan": true,
      "vegetarian": true
    },
    {
      "title": "Spinach and Feta Stuffed Chicken",
      "description": "Chicken breast stuffed with spinach and feta, baked to perfection.",
      "zipcode": "45678",
      "calories": 400,
      "rating": 4.4,
      "image": "https://via.placeholder.com/200",
      "glutenFree": false,
      "vegan": false,
      "vegetarian": false
    }]
  },
  {
    id: 3,
    title: 'La Trattoria',
    address: '789 Oak St, Washington, D.C.',
    phone: '(202) 555-9876',
    email: 'test@test.com',
    rating: '4.3',
    meals: [
      {
        "title": "Pineapple Fried Rice",
        "description": "Fried rice with pineapple, shrimp, vegetables, and a sweet soy glaze.",
        "zipcode": "90123",
        "calories": 500,
        "rating": 4.8,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Black Bean Burger",
        "description": "A hearty black bean burger topped with lettuce, tomato, and avocado.",
        "zipcode": "56789",
        "calories": 350,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Caprese Panini",
        "description": "Grilled panini with mozzarella, tomato, basil, and balsamic glaze.",
        "zipcode": "23456",
        "calories": 450,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Shrimp Scampi",
        "description": "Lemon-garlic shrimp scampi served over a bed of linguine pasta.",
        "zipcode": "78901",
        "calories": 400,
        "rating": 4.5,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 4,
    title: 'The Red Pepper',
    address: '101 Walnut St, Washington, D.C.',
    phone: '(202) 555-6543',
    email: 'test@test.com',
    rating: '4.0',
    meals: [{
      "title": "Mushroom Risotto",
      "description": "Creamy mushroom risotto with Arborio rice, mushrooms, and parmesan cheese.",
      "zipcode": "34567",
      "calories": 550,
      "rating": 4.5,
      "image": "https://via.placeholder.com/200",
      "glutenFree": false,
      "vegan": false,
      "vegetarian": true
    },
    {
      "title": "Avocado Toast",
      "description": "Sliced avocado on toasted whole-grain bread, topped with a sprinkle of sea salt.",
      "zipcode": "89012",
      "calories": 200,
      "rating": 4.7,
      "image": "https://via.placeholder.com/200",
      "glutenFree": true,
      "vegan": true,
      "vegetarian": true
    },
    {
      "title": "Chicken Pesto Pasta",
      "description": "Pasta tossed in a basil pesto sauce with grilled chicken and cherry tomatoes.",
      "zipcode": "45678",
      "calories": 400,
      "rating": 4.4,
      "image": "https://via.placeholder.com/200",
      "glutenFree": false,
      "vegan": false,
      "vegetarian": false
    },
    {
      "title": "Sweet Potato and Black Bean Bowl",
      "description": "Roasted sweet potatoes and black beans served with quinoa and a chipotle-lime dressing.",
      "zipcode": "90123",
      "calories": 350,
      "rating": 4.8,
      "image": "https://via.placeholder.com/200",
      "glutenFree": true,
      "vegan": true,
      "vegetarian": true
    }]
  },
  {
    id: 5,
    title: 'Seafood Haven',
    address: '234 Pine St, Washington, D.C.',
    phone: '(202) 555-3456',
    email: 'test@test.com',
    rating: '4.7',
    meals: [
      {
        "title": "Tomato Basil Pasta",
        "description": "Pasta tossed in a rich tomato-basil sauce, garnished with fresh basil leaves.",
        "zipcode": "56789",
        "calories": 400,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Hawaiian Poke Bowl",
        "description": "A delightful poke bowl with fresh tuna, rice, avocado, and tropical flavors.",
        "zipcode": "23456",
        "calories": 450,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Lemon Garlic Chicken",
        "description": "Juicy chicken breasts marinated in a zesty lemon-garlic sauce, grilled to perfection.",
        "zipcode": "78901",
        "calories": 300,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 6,
    title: 'Casa de Sabor',
    address: '567 Birch St, Washington, D.C.',
    phone: '(202) 555-4321',
    email: 'test@test.com',
    rating: '4.2',
    meals: [
      {
        "title": "Greek Salad",
        "description": "A refreshing Greek salad with tomatoes, cucumbers, olives, and feta cheese.",
        "zipcode": "34567",
        "calories": 300,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Teriyaki Tofu Bowl",
        "description": "Teriyaki-glazed tofu with brown rice, broccoli, and sesame seeds.",
        "zipcode": "89012",
        "calories": 350,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Beef and Broccoli Stir-Fry",
        "description": "Savory beef and broccoli stir-fry with a flavorful soy-based sauce.",
        "zipcode": "45678",
        "calories": 500,
        "rating": 4.1,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Caesar Salad",
        "description": "Classic Caesar salad with crisp romaine lettuce, croutons, and parmesan cheese.",
        "zipcode": "90123",
        "calories": 350,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 7,
    title: 'Spice Bazaar',
    address: '789 Cedar St, Washington, D.C.',
    phone: '(202) 555-8765',
    email: 'test@test.com',
    rating: '4.6',
    meals: [
      {
        "title": "Chicken Parmesan",
        "description": "Breaded and baked chicken breast topped with marinara sauce and melted mozzarella cheese.",
        "zipcode": "12345",
        "calories": 550,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Mushroom Risotto",
        "description": "Creamy and savory mushroom risotto cooked to perfection with Arborio rice.",
        "zipcode": "56789",
        "calories": 400,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Sweet Potato and Chickpea Curry",
        "description": "A flavorful curry with sweet potatoes, chickpeas, and aromatic spices.",
        "zipcode": "67890",
        "calories": 450,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 8,
    title: 'Bistro 360',
    address: '123 Cherry St, Washington, D.C.',
    phone: '(202) 555-7890',
    email: 'test@test.com',
    rating: '4.4',
    meals: [
      {
        "title": "BBQ Pulled Pork Sandwich",
        "description": "Slow-cooked pulled pork smothered in barbecue sauce, served in a soft bun.",
        "zipcode": "23456",
        "calories": 600,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Lemon Herb Grilled Salmon",
        "description": "Grilled salmon fillet marinated in a zesty lemon and herb mixture.",
        "zipcode": "78901",
        "calories": 350,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Vegetable Lasagna",
        "description": "Layers of pasta, ricotta cheese, and a medley of roasted vegetables, baked to perfection.",
        "zipcode": "34567",
        "calories": 500,
        "rating": 4.8,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      }
    ]
  },
  {
    id: 9,
    title: 'Harborview Restaurant',
    address: '345 Apple St, Washington, D.C.',
    phone: '(202) 555-2345',
    email: 'test@test.com',
    rating: '4.9',
    meals: [
      {
        "title": "Cajun Shrimp Pasta",
        "description": "Pasta tossed with Cajun-spiced shrimp, bell peppers, and a creamy Alfredo sauce.",
        "zipcode": "89012",
        "calories": 480,
        "rating": 4.4,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Teriyaki Chicken Bowl",
        "description": "Teriyaki-glazed chicken served over a bed of jasmine rice with steamed broccoli.",
        "zipcode": "45678",
        "calories": 420,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Eggplant Parmesan",
        "description": "Breaded and baked eggplant slices topped with marinara sauce and melted mozzarella cheese.",
        "zipcode": "90123",
        "calories": 380,
        "rating": 4.5,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 10,
    title: 'Taste of India',
    address: '567 Fig St, Washington, D.C.',
    phone: '(202) 555-5678',
    email: 'test@test.com',
    rating: '4.1',
    meals: [
      {
        "title": "Thai Basil Beef Stir-Fry",
        "description": "Spicy Thai basil beef stir-fry with bell peppers, onions, and aromatic herbs.",
        "zipcode": "56789",
        "calories": 470,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Caprese Salad",
        "description": "Fresh Caprese salad with juicy tomatoes, mozzarella, basil, and balsamic glaze.",
        "zipcode": "23456",
        "calories": 320,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Chicken Fajitas",
        "description": "Sizzling chicken fajitas with bell peppers, onions, and a blend of Mexican spices.",
        "zipcode": "78901",
        "calories": 550,
        "rating": 4.1,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 11,
    title: 'The Grill House',
    address: '101 Olive St, Washington, D.C.',
    phone: '(202) 555-3456',
    email: 'test@test.com',
    rating: '4.7',
    meals: [
      {
        "title": "Vegetarian Burrito Bowl",
        "description": "A hearty burrito bowl with rice, black beans, corn, guacamole, and salsa.",
        "zipcode": "34567",
        "calories": 400,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Honey Mustard Glazed Salmon",
        "description": "Salmon fillet glazed with a sweet and tangy honey mustard sauce, served with roasted vegetables.",
        "zipcode": "89012",
        "calories": 470,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Mediterranean Quinoa Bowl",
        "description": "Quinoa bowl with Mediterranean-inspired ingredients, including olives, feta, and cherry tomatoes.",
        "zipcode": "45678",
        "calories": 380,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 12,
    title: 'Mediterranean Delight',
    address: '234 Walnut St, Washington, D.C.',
    phone: '(202) 555-8765',
    email: 'test@test.com',
    rating: '4.3',
    meals: [
      {
        "title": "Chicken Caesar Wrap",
        "description": "Grilled chicken, romaine lettuce, and Caesar dressing wrapped in a soft tortilla.",
        "zipcode": "12345",
        "calories": 420,
        "rating": 4.4,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Pesto Pasta with Sun-Dried Tomatoes",
        "description": "Pasta tossed in a flavorful pesto sauce with sun-dried tomatoes and parmesan cheese.",
        "zipcode": "56789",
        "calories": 480,
        "rating": 4.1,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Blackened Shrimp Tacos",
        "description": "Blackened shrimp served in corn tortillas with slaw, avocado, and chipotle mayo.",
        "zipcode": "67890",
        "calories": 350,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 13,
    title: 'Noodle World',
    address: '456 Pine St, Washington, D.C.',
    phone: '(202) 555-4321',
    email: 'test@test.com',
    rating: '4.5',
    meals: [
      {
        "title": "Vegetable Noodle Stir-Fry",
        "description": "Stir-fried noodles with a variety of colorful vegetables and a savory soy-based sauce.",
        "zipcode": "23456",
        "calories": 400,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Spicy Tofu Burrito",
        "description": "Spicy tofu, rice, black beans, and salsa wrapped in a large flour tortilla.",
        "zipcode": "78901",
        "calories": 380,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Baked Ziti",
        "description": "Classic baked ziti with layers of pasta, ricotta cheese, marinara sauce, and melted mozzarella.",
        "zipcode": "34567",
        "calories": 500,
        "rating": 4.9,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      }
    ]
  },
  {
    id: 14,
    title: 'Sushi Central',
    address: '789 Elm St, Washington, D.C.',
    phone: '(202) 555-1234',
    email: 'test@test.com',
    rating: '4.6',
    meals: [
      {
        "title": "Sushi Roll Platter",
        "description": "Assorted sushi rolls with fresh fish, avocado, and cucumber, served with soy sauce and wasabi.",
        "zipcode": "89012",
        "calories": 320,
        "rating": 4.5,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Crispy Buffalo Cauliflower Bites",
        "description": "Cauliflower florets coated in a crispy batter and tossed in spicy buffalo sauce.",
        "zipcode": "45678",
        "calories": 280,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Pineapple Coconut Chicken Curry",
        "description": "Chicken curry with a tropical twist, featuring pineapple and coconut milk.",
        "zipcode": "90123",
        "calories": 450,
        "rating": 4.8,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 15,
    title: 'BBQ Junction',
    address: '123 Oak St, Washington, D.C.',
    phone: '(202) 555-9876',
    email: 'test@test.com',
    rating: '4.2',
    meals: [
      {
        "title": "Avocado BLT Sandwich",
        "description": "Classic BLT sandwich with the addition of creamy avocado slices.",
        "zipcode": "56789",
        "calories": 380,
        "rating": 4.4,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Mango Chicken Quesadilla",
        "description": "Grilled chicken, mango salsa, and melted cheese folded in a crispy tortilla.",
        "zipcode": "23456",
        "calories": 420,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Stuffed Bell Peppers",
        "description": "Bell peppers stuffed with a mixture of ground beef, rice, and tomato sauce, baked until tender.",
        "zipcode": "78901",
        "calories": 320,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 16,
    title: 'The Chocolate Cafe',
    address: '345 Cedar St, Washington, D.C.',
    phone: '(202) 555-2345',
    email: 'test@test.com',
    rating: '4.4',
    meals: [
      {
        "title": "Cilantro Lime Shrimp Tacos",
        "description": "Grilled shrimp seasoned with cilantro and lime, served in corn tortillas with slaw.",
        "zipcode": "34567",
        "calories": 380,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      }
    ]
  },
  {
    id: 17,
    title: 'Farm to Table',
    address: '567 Walnut St, Washington, D.C.',
    phone: '(202) 555-5678',
    email: 'test@test.com',
    rating: '4.8',
    meals: [
      {
        "title": "Shrimp and Asparagus Stir-Fry",
        "description": "Quick and flavorful stir-fry with shrimp, asparagus, and a garlic-soy sauce.",
        "zipcode": "89012",
        "calories": 320,
        "rating": 4.5,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Quinoa and Black Bean Bowl",
        "description": "Nutrient-packed bowl with quinoa, black beans, corn, and a lime-cilantro dressing.",
        "zipcode": "45678",
        "calories": 400,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 18,
    title: 'Soul Food Shack',
    address: '101 Elm St, Washington, D.C.',
    phone: '(202) 555-8765',
    email: 'test@test.com',
    rating: '4.7',
    meals: [
      {
        "title": "Lemon Garlic Butter Salmon",
        "description": "Salmon fillet baked with a lemon-garlic butter sauce, served with roasted vegetables.",
        "zipcode": "90123",
        "calories": 450,
        "rating": 4.8,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Caprese Stuffed Portobello Mushrooms",
        "description": "Portobello mushrooms stuffed with tomatoes, mozzarella, and basil, baked until gooey and delicious.",
        "zipcode": "56789",
        "calories": 280,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": true
      }
    ]
  },
  {
    id: 19,
    title: 'Pasta Palace',
    address: '234 Pine St, Washington, D.C.',
    phone: '(202) 555-4321',
    email: 'test@test.com',
    rating: '4.5',
    meals: [
      {
        "title": "Chicken and Broccoli Alfredo",
        "description": "Creamy Alfredo sauce with tender chicken and broccoli, served over fettuccine pasta.",
        "zipcode": "23456",
        "calories": 520,
        "rating": 4.4,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Sesame Ginger Tofu Stir-Fry",
        "description": "Tofu stir-fried with sesame ginger sauce, broccoli, and bell peppers.",
        "zipcode": "78901",
        "calories": 350,
        "rating": 4.0,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      },
      {
        "title": "Tomato Basil Bruschetta",
        "description": "Classic bruschetta with diced tomatoes, fresh basil, garlic, and balsamic glaze on toasted bread.",
        "zipcode": "34567",
        "calories": 220,
        "rating": 4.6,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": true,
        "vegetarian": true
      }
    ]
  },
  {
    id: 20,
    title: 'Gourmet Grind',
    address: '456 Oak St, Washington, D.C.',
    phone: '(202) 555-1234',
    email: 'test@test.com',
    rating: '4.6',
    meals: [

      {
        "title": "Hawaiian Poke Bowl",
        "description": "A refreshing bowl with diced raw fish, avocado, cucumber, and a soy-based marinade.",
        "zipcode": "89012",
        "calories": 380,
        "rating": 4.3,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Mushroom and Spinach Quesadilla",
        "description": "Quesadilla filled with sautéed mushrooms, spinach, and melted cheese.",
        "zipcode": "45678",
        "calories": 300,
        "rating": 4.7,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": true
      },
      {
        "title": "Pesto Chicken Penne",
        "description": "Penne pasta with grilled chicken and a creamy pesto sauce.",
        "zipcode": "90123",
        "calories": 480,
        "rating": 4.2,
        "image": "https://via.placeholder.com/200",
        "glutenFree": false,
        "vegan": false,
        "vegetarian": false
      },
      {
        "title": "Crispy Tofu Tacos",
        "description": "Crispy tofu strips in corn tortillas with slaw, cilantro, and spicy mayo.",
        "zipcode": "56789",
        "calories": 340,
        "rating": 4.9,
        "image": "https://via.placeholder.com/200",
        "glutenFree": true,
        "vegan": true,
        "vegetarian": true
      }
    ]
  }
];