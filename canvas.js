const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const initializeCanvas = (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
};

initializeCanvas(context);

const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
};

export const drawHead = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
};

export const drawBody = () => {
    drawLine(70, 40, 70, 80);
};

export const drawLeftArm = () => {
    drawLine(70, 50, 50, 70);
};

export const drawRightArm = () => {
    drawLine(70, 50, 90, 70);
};

export const drawLeftLeg = () => {
    drawLine(70, 80, 50, 110);
};

export const drawRightLeg = () => {
    drawLine(70, 80, 90, 110);
};

export const drawInitialStructure = () => {
    clearCanvas();
    drawLine(10, 130, 130, 130); // Base
    drawLine(10, 10, 10, 131); // Left pole
    drawLine(10, 10, 70, 10); // Top pole
    drawLine(70, 10, 70, 20); // Rope
};

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
};
