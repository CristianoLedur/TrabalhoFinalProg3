import app from './App.js';
const port = process.env.PORT || 3001;
app.listen(port, (err) => {
    if (err) {
        console.log("Erro ao iniciar o servidor...", err)
    } else {
        console.log(`Server running (port ${port}).`);
    }
});
