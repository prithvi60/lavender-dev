import emptyLogo from "../../assets/emptyImage.png"

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
            "Tamil",
            "English",
            "French"
        ],
        "accessibility": [
            "Wheelchair available"
        ]
    }
]