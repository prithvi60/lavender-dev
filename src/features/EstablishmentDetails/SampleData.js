import emptyLogo from "../../assets/emptyImage.png"
let estResultJson = [
    {
        "id": "123",
        "version": 1.0,
        "establishmentName": "ABC Salon",
        "establishmentAbout": "ABC Salon provides professional hair and beauty services in a relaxing environment.",
        "establishmentLocation": "456 Oak St, Anytown, USA",
        "geoX": "40.7128",
        "geoY": "-74.0060",
        "serviceCategories": [
            {
                "categoryName": "Haircuts",
                "serviceTags": [
                    "Haircut"
                ],
                "services": [
                    {
                        "serviceId": "101",
                        "serviceName": "Men's Haircut",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "Basic Cut",
                                "salePrice": 20,
                                "maxPrice": 30,
                                "discountPrice": 5,
                                "discountPercentage": 16.67,
                                "duration": 30
                            }
                        ],
                        "startingPrice": 20
                    },
                    {
                        "serviceId": "102",
                        "serviceName": "Women's Haircut",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "Trim",
                                "salePrice": 25,
                                "maxPrice": 35,
                                "discountPrice": 5,
                                "discountPercentage": 14.29,
                                "duration": 30
                            }
                        ],
                        "startingPrice": 25
                    }
                ]
            },
            {
                "categoryName": "Coloring",
                "serviceTags": [
                    "Coloring",
                    "Highlights"
                ],
                "services": [
                    {
                        "serviceId": "201",
                        "serviceName": "Highlights",
                        "viewTags": [
                            "Highlights"
                        ],
                        "options": [
                            {
                                "optionName": "Partial Highlights",
                                "salePrice": 60,
                                "maxPrice": 75,
                                "discountPrice": 15,
                                "discountPercentage": 20,
                                "duration": 60
                            }
                        ],
                        "startingPrice": 60
                    },
                    {
                        "serviceId": "202",
                        "serviceName": "Hair Coloring",
                        "viewTags": [
                            "Highlights"
                        ],
                        "options": [
                            {
                                "optionName": "Root Touch-Up",
                                "salePrice": 50,
                                "maxPrice": 65,
                                "discountPrice": 15,
                                "discountPercentage": 23.08,
                                "duration": 45
                            }
                        ],
                        "startingPrice": 50
                    }
                ]
            }
        ],
        "estImages": [
            "image1.jpg",
            "image2.jpg"
        ],
        "facilities": {
            "instantBooking": true,
            "freeCancellation": true
        },
        "otherInfos": [
            "Accepts Credit Cards",
            "Wheelchair Accessible"
        ],
        "languages": [
            "ENG",
            "SPA"
        ]
    },
    {
        "id": "456",
        "version": 1.0,
        "establishmentName": "XYZ Spa & Salon",
        "establishmentAbout": "XYZ Spa & Salon offers a wide range of beauty and wellness services to help you relax and rejuvenate.",
        "establishmentLocation": "789 Maple Ave, Anycity, USA",
        "geoX": "41.8781",
        "geoY": "-87.6298",
        "serviceCategories": [
            {
                "categoryName": "Massages",
                "serviceTags": [
                    "Massage",
                    "Therapy"
                ],
                "services": [
                    {
                        "serviceId": "301",
                        "serviceName": "Swedish Massage",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "60-Minute Session",
                                "salePrice": 60,
                                "maxPrice": 80,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 60
                            }
                        ],
                        "startingPrice": 60
                    },
                    {
                        "serviceId": "302",
                        "serviceName": "Deep Tissue Massage",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "90-Minute Session",
                                "salePrice": 90,
                                "maxPrice": 120,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 90
                            }
                        ],
                        "startingPrice": 90
                    }
                ]
            },
            {
                "categoryName": "Facials",
                "serviceTags": [
                    "Facial",
                    "Skincare"
                ],
                "services": [
                    {
                        "serviceId": "401",
                        "serviceName": "Classic Facial",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "60-Minute Session",
                                "salePrice": 50,
                                "maxPrice": 70,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 60
                            }
                        ],
                        "startingPrice": 50
                    }
                ]
            }
        ],
        "estImages": [
            "image3.jpg",
            "image4.jpg"
        ],
        "facilities": {
            "instantBooking": true,
            "freeCancellation": true
        },
        "otherInfos": [
            "Parking Available",
            "Complimentary Refreshments"
        ],
        "languages": [
            "ENG",
            "FRE"
        ]
    },
    {
        "id": "789",
        "version": 1.0,
        "establishmentName": "Sunrise Beauty Spa",
        "establishmentAbout": "Sunrise Beauty Spa offers a serene environment for relaxation and beauty treatments.",
        "establishmentLocation": "101 Sunset Blvd, Sunnytown, USA",
        "geoX": "34.0522",
        "geoY": "-118.2437",
        "serviceCategories": [
            {
                "categoryName": "Manicure & Pedicure",
                "serviceTags": [
                    "Nails",
                    "ManiPedi"
                ],
                "services": [
                    {
                        "serviceId": "501",
                        "serviceName": "Gel Manicure",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "Basic Gel Manicure",
                                "salePrice": 35,
                                "maxPrice": 45,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 45
                            }
                        ],
                        "startingPrice": 35
                    },
                    {
                        "serviceId": "502",
                        "serviceName": "Classic Pedicure",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "Deluxe Pedicure",
                                "salePrice": 45,
                                "maxPrice": 55,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 60
                            }
                        ],
                        "startingPrice": 45
                    }
                ]
            },
            {
                "categoryName": "Facials",
                "serviceTags": [
                    "Facial",
                    "Skincare"
                ],
                "services": [
                    {
                        "serviceId": "601",
                        "serviceName": "Hydrating Facial",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "60-Minute Session",
                                "salePrice": 60,
                                "maxPrice": 80,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 60
                            }
                        ],
                        "startingPrice": 60
                    },
                    {
                        "serviceId": "602",
                        "serviceName": "Anti-Aging Facial",
                        "viewTags": [
                            "Featured"
                        ],
                        "options": [
                            {
                                "optionName": "90-Minute Session",
                                "salePrice": 90,
                                "maxPrice": 120,
                                "discountPrice": 0,
                                "discountPercentage": 0,
                                "duration": 90
                            }
                        ],
                        "startingPrice": 90
                    }
                ]
            }
        ],
        "estImages": [
            "sunrise1.jpg",
            "sunrise2.jpg"
        ],
        "facilities": {
            "instantBooking": true,
            "freeCancellation": true
        },
        "otherInfos": [
            "Complimentary Wi-Fi",
            "Refreshments Available"
        ],
        "languages": [
            "ENG",
            "SPA"
        ]
    }
]


export const SampleData = [
    {
        "establishmentId": 1,
        "establishmentName": "Parlor1 - Women’s Parlour & Spa",
        "establishmentAbout": "Welcome to Yong Chow's Paradise – a haven for women seeking beauty, relaxation, and rejuvenation. Nestled in the heart of the city, Yong Chow's Paradise is not just a salon and spa; it's an experience designed to pamper and enhance your natural beauty.",
        "establishmentGeoLocation": "Location 1",
        "establishmentOpeningTime": "10 a.m",
        "instantBooking": true,
        "freeCancellation": true,
        "image": [
            emptyLogo,
            emptyLogo,
            emptyLogo
        ],
        "averageRating": 4.3,
        "ratingCount": 187,
        "serviceTags": [
            "Featured",
            "Hair treatments",
            "Featured",
            "Hair cut",
            "Hair styling",
            "Massage"
        ],
        "services": [
            {
                "serviceId": 1,
                "servciceParentId": null,
                "serviceName": "Hair Coloring",
                "serviceTag": "Haircuts",
                "serviceDuration": "180 mins",
                "serviceDescription": "Indulge in the ultimate pampering with our Classic Pedicure.",
                "startingPrice": 95.50,
                "options": [
                    {
                        "serviceName": "Solid Tone Refresh",
                        "duration": "30 mins",
                        "startingPrice": 30
                    },
                    {
                        "serviceName": "Root Touch-Up",
                        "duration": "20 mins",
                        "startingPrice": 40
                    }
                ]
            },
            {
                "serviceId": 2,
                "servciceParentId": 1,
                "serviceName": "Hair straightening",
                "serviceTag": "Haircuts",
                "serviceDuration": "180 mins",
                "serviceDescription": "Indulge in the ultimate pampering with our Classic Pedicure.",
                "startingPrice": 50,
                "options": [
                    {
                        "serviceName": "Solid Tone Refresh",
                        "duration": "30 mins",
                        "startingPrice": 30
                    },
                    {
                        "serviceName": "Root Touch-Up",
                        "duration": "20 mins",
                        "startingPrice": 40
                    }
                ]
            },
            {
                "serviceId": 3,
                "servciceParentId": null,
                "serviceName": "medicure",
                "serviceTag": "Face",
                "serviceDuration": "130 mins",
                "serviceDescription": "Indulge in the ultimate pampering with our Classic Pedicure.",
                "startingPrice": 50,
                "options": [
                    {
                        "serviceName": "Solid Tone Refresh",
                        "duration": "30 mins",
                        "startingPrice": 30
                    },
                    {
                        "serviceName": "Root Touch-Up",
                        "duration": "20 mins",
                        "startingPrice": 40
                    }
                ]
            }
        ],
        "availability": [
            {
                "day": "Monday",
                "startTime": "9.00 am",
                "endTime": "8.00pm",
                "isOpen": true
            },
            {
                "day": "Tuesday",
                "startTime": "9.00 am",
                "endTime": "8.00pm",
                "isOpen": true
            },
            {
                "day": "Wednesday",
                "startTime": "9.00 am",
                "endTime": "8.00pm",
                "isOpen": true
            },
            {
                "day": "Thursday",
                "startTime": "9.00 am",
                "endTime": "8.00pm",
                "isOpen": true
            },
            {
                "day": "Friday",
                "startTime": "9.00 am",
                "endTime": "6.00pm",
                "isOpen": true
            },
            {
                "day": "Saturday",
                "startTime": "9.00 am",
                "endTime": "8.00pm",
                "isOpen": false
            },
            {
                "day": "Sunday",
                "startTime": null,
                "endTime": null,
                "isOpen": false
            }
        ],
        "locationDetails": "4116 S, Roosevelt Rd, Berwyn, 75052",
        "establishmentTeam": [
            {
                "employeeId": 1,
                "employeeTitle": "Lee huso chan yi",
                "employeeImage": "/profileImage1.png"
            },
            {
                "employeeId": 2,
                "employeeTitle": "Lee huso chan yi",
                "employeeImage": "/profileImage2.png"
            },
            {
                "employeeId": 3,
                "employeeTitle": "Lee huso chan yi",
                "employeeImage": "/profileImage3.png"
            }
        ],
        "paymentMethod": [
            "Cash",
            "Credit card",
            "Debit card"
        ],
        "languages": [
            "English",
            "Spanish"
        ],
        "accessibility": [
            "Complimentary Wi-Fi",
        "Refreshments Available"
        ]
    }
]