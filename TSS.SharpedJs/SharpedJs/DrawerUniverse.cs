using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TSS.SharpedJs;
using Bridge;
using Bridge.Html5;

namespace TSS.SharpedJs
{
    class DrawerUniverse
    {
        public Universe _Universe { get; private set; }
        public HTMLCanvasElement CanvasElement { get; private set; }
        public CanvasRenderingContext2D CanvasContext { get; private set; }
        public Action<int> UniverseInfoFontSizeSetter;
        int squareSideSize, thicknessSize;
        int squareHalfSideSize, squareHalfSideSizeDec, squareHalfOfHalfSideSizeDec, squareHalfSideSizePlusThicknessSize, squareSidePlusThickness;
        string canvasBackgroundColor = "#7B7B7B";
        string emptySquareColor= "#F5F4F9";
        string foodColor = "#05F44D",
            poisonColor = "#FEB049",
            deadCellColor = "#F40505";
        int imageHeight, imageWidth;
        int universeWidth, universeHeight;
        int[,] descriptorsWasBuf;
        bool useCircleForRender=true;
        double percentOfCanvasWidthAtWindow = 0.7;
        

        public DrawerUniverse(HTMLCanvasElement canvasElement, int universeWidth, int universeHeight)
        {
            CanvasElement = canvasElement;
            CanvasContext = CanvasElement.GetContext(CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D);
            this.universeWidth = universeWidth;
            this.universeHeight = universeHeight;
            CalcScreenConsts();
            
        }

        public void CalcScreenConsts()
        {
            imageWidth = (int)(Window.InnerWidth * percentOfCanvasWidthAtWindow);
            imageHeight = universeHeight * imageWidth / universeWidth;
            squareSideSize = (int)(imageWidth / universeWidth * 0.95);
            squareHalfSideSize = squareSideSize / 2;
            squareHalfSideSizeDec = squareHalfSideSize - 1;
            squareHalfOfHalfSideSizeDec = squareHalfSideSizeDec / 2;
            thicknessSize = (int)(imageWidth / universeWidth * 0.05);
            if (squareHalfSideSizeDec < 1)
            {
                thicknessSize = 0;
                useCircleForRender = false;
                if (squareSideSize < 1)
                    throw new Exception("Canvas size is too small for this universe.");
            }
            else
                useCircleForRender = true;
            squareSidePlusThickness = imageWidth / universeWidth;
            squareHalfSideSizePlusThicknessSize = squareHalfSideSize + thicknessSize;

            //reverse fix size of canvas
            imageWidth = squareSidePlusThickness * universeWidth + thicknessSize;
            imageHeight = squareSidePlusThickness * universeHeight + thicknessSize;

            CanvasElement.Width = imageWidth;
            CanvasElement.Height = imageHeight;

            int universeInfoFontSize = (int)(Window.InnerWidth * (1 - percentOfCanvasWidthAtWindow) /24);
            UniverseInfoFontSizeSetter?.Invoke(universeInfoFontSize);

            ResetCanvas();
            
        }

        public void DrawFrame(int[,] descriptors)
        {
            if (useCircleForRender)
            {
                for (int i = 0; i < universeWidth; i++)
                {
                    for (int j = 0; j < universeHeight; j++)
                    {
                        if (descriptorsWasBuf != null && descriptors[i, j] == descriptorsWasBuf[i, j])
                            continue;
                        DrawUniverseObjectBig(CanvasContext, descriptors[i, j], i, j);
                    }
                }
            }
            else
            {
                for (int i = 0; i < universeWidth; i++)
                {
                    for (int j = 0; j < universeHeight; j++)
                    {
                        if (descriptorsWasBuf != null && descriptors[i, j] == descriptorsWasBuf[i, j])
                            continue;
                        DrawUniverseObjectSmall(CanvasContext, descriptors[i, j], i, j);
                    }
                }
            }
            descriptorsWasBuf = descriptors ;
        }

        void ResetCanvas()
        {
            if (thicknessSize>0)
            {
                CanvasContext.FillStyle = canvasBackgroundColor;
                CanvasContext.FillRect(0, 0, imageWidth, imageHeight);
                for (int i = 0; i < universeWidth; i++)
                {
                    for (int j = 0; j < universeHeight; j++)
                    {
                        ClearSquare(CanvasContext, i, j);
                    }
                }
            }
            else
            {
                CanvasContext.FillStyle = emptySquareColor;
                CanvasContext.FillRect(0, 0, imageWidth, imageHeight);
            }
            descriptorsWasBuf = null;
        }

        void DrawUniverseObjectBig(CanvasRenderingContext2D canvasContext, int descriptor, int xAtUniverse, int yAtUniverse)
        {
            //CanvasContext.FillStyle = GraphicsHelper.CssColorFromInt(descriptor);
            ClearSquare(canvasContext, xAtUniverse, yAtUniverse);
            if (descriptor == 0)
            {

            }
            else if (descriptor < 0)
            {
                if (descriptor == -1)
                {
                    DrawCircleWithWhiteWhole(canvasContext, foodColor, xAtUniverse, yAtUniverse);
                }
                else if (descriptor == -2)
                {
                    DrawCircleWithWhiteWhole(canvasContext, deadCellColor, xAtUniverse, yAtUniverse);
                }
                else
                {
                    DrawCircleWithWhiteWhole(canvasContext, poisonColor, xAtUniverse, yAtUniverse);
                }
            }
            else
            {
                DrawCircle(canvasContext, GraphicsHelper.CssColorFromInt(descriptor), xAtUniverse, yAtUniverse);
            }
        }

        void DrawUniverseObjectSmall(CanvasRenderingContext2D canvasContext, int descriptor, int xAtUniverse, int yAtUniverse)
        {
            //CanvasContext.FillStyle = GraphicsHelper.CssColorFromInt(descriptor);
            ClearSquare(canvasContext, xAtUniverse, yAtUniverse);
            if (descriptor == 0)
            {

            }
            else if (descriptor < 0)
            {
                if (descriptor == -1)
                {
                    DrawSquare(canvasContext, foodColor, xAtUniverse, yAtUniverse);
                }
                else if (descriptor == -2)
                {
                    DrawSquare(canvasContext, deadCellColor, xAtUniverse, yAtUniverse);
                }
                else
                {
                    DrawSquare(canvasContext, poisonColor, xAtUniverse, yAtUniverse);
                }
            }
            else
            {
                DrawSquare(canvasContext, GraphicsHelper.CssColorFromInt(descriptor), xAtUniverse, yAtUniverse);
            }
        }

        void DrawSquare(CanvasRenderingContext2D canvasContext, string color, int xAtUniverse, int yAtUniverse)
        {

            canvasContext.FillStyle = color;
            canvasContext.FillRect(
                thicknessSize + squareSidePlusThickness * xAtUniverse,
                thicknessSize + squareSidePlusThickness * yAtUniverse,
                squareSideSize,
                squareSideSize
                );
        }

        void DrawCircle(CanvasRenderingContext2D canvasContext, string color, int xAtUniverse, int yAtUniverse)
        {
            CanvasContext.BeginPath();
            canvasContext.StrokeStyle = color;
            canvasContext.Ellipse(
                squareHalfSideSizePlusThicknessSize + squareSidePlusThickness * xAtUniverse,
                squareHalfSideSizePlusThicknessSize + squareSidePlusThickness * yAtUniverse,
                squareHalfSideSizeDec,
                squareHalfSideSizeDec,
                0, 0, 6.29
                );
            canvasContext.FillStyle = color;
            canvasContext.Fill();
            canvasContext.ClosePath();
            canvasContext.Stroke();
        }

        void DrawCircleWithWhiteWhole(CanvasRenderingContext2D canvasContext, string color, int xAtUniverse, int yAtUniverse)
        {
            CanvasContext.BeginPath();
            int posX = squareHalfSideSizePlusThicknessSize + squareSidePlusThickness * xAtUniverse;
            int posY = squareHalfSideSizePlusThicknessSize + squareSidePlusThickness * yAtUniverse;
            canvasContext.StrokeStyle = color;
            canvasContext.Ellipse(
                posX,
                posY,
                squareHalfSideSizeDec,
                squareHalfSideSizeDec,
                0, 0, 6.29
                );
            canvasContext.FillStyle = color;
            canvasContext.Fill();
            canvasContext.ClosePath();
            canvasContext.Stroke();

            if (squareHalfOfHalfSideSizeDec > 0)
            {
                CanvasContext.BeginPath();
                canvasContext.Ellipse(
                    posX,
                    posY,
                    squareHalfOfHalfSideSizeDec,
                    squareHalfOfHalfSideSizeDec,
                    0, 0, 6.29
                    );
                canvasContext.FillStyle = "white";
                canvasContext.Fill();
                canvasContext.ClosePath();
                canvasContext.Stroke();
            }
        }

        void ClearSquare(CanvasRenderingContext2D canvasContext, int xAtUniverse, int yAtUniverse)
        {
            DrawSquare(canvasContext, emptySquareColor, xAtUniverse, yAtUniverse);
        }


    }
}
