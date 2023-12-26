const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/nearby-places', async (req, res) => {
    try {
        const { latitude, longitude, radius = 500, type = 'restaurant', apiKey } = req.body;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
        );

        const places = response.data.results.map((place) => ({
            name: place.name,
            vicinity: place.vicinity,
            types: place.types,
            location: place.geometry.location,
        }));

        res.json({ places });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
