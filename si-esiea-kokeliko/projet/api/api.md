# GET /travels

Récupère une liste json ainsi :

```json
{
    "travels": [
        {
            "id":1,
            "startAirport": {
                "name":"New York",
                "code":"JFK"
            },
            "endAirport": {
                "name":"CDG Paris",
                "code":"CDG"
            },
            "cost":150
        },
        { ... }
    ]
}
```

# POST /book

On attend un formulaire :

```json
{
    "travels": [
        {
            "id":1
        },
        {
            "id":2
        },
        { ... }
    ],
    "email": "abc@gmail.com"
}
```

On ne renvoie pas de réponse, c'est une réservation pour l'email fournis

# GET /user/{email}

On renvoie les réservations ainsi :

```json
{
    "reservations": {
        "travels": [
            {
                "id":1,
                "startAirport": {
                    "name":"New York",
                    "code":"JFK"
                },
                "endAirport": {
                    "name":"CDG Paris",
                    "code":"CDG"
                },
                "cost":150
            },
            { ... }
        ],
        "travels": [
            {
                "id":3,
                "startAirport": {
                    "name":"Detroit",
                    "code":"DT"
                },
                "endAirport": {
                    "name":"CDG Paris",
                    "code":"CDG"
                },
                "cost":150
            },
            { ... }
        ]
    }
}
```