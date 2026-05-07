export class BinaryRainBackdrop extends HTMLElement {
    /**
     * Builds the canvas, prepares the grid state, and starts the timed animation loop.
     */
    connectedCallback() {
        this.setAttribute('aria-hidden', 'true');
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'binary-rain-canvas';
        this.replaceChildren(this.canvas);

        this.canvasContext = this.canvas.getContext('2d');
        this.binaryCharacters = ['0', '1'];
        this.cellSize = 18;
        this.frameDelayMs = 72;
        this.backgroundResetColor = 'rgba(7, 11, 20, 0.9)';
        this.backgroundTrailFadeColor = 'rgba(7, 11, 20, 0.24)';
        this.dropHeadColor = 'rgba(229, 255, 255, 0.62)';

        this.resizeObserver = new ResizeObserver(() => this.resize());
        if (this.parentElement) {
            this.resizeObserver.observe(this.parentElement);
        }
        this.resize();

        this.draw();
        this.animationTimerId = window.setInterval(() => this.draw(), this.frameDelayMs);
    }

    /**
     * Stops the animation and resize watcher when the element leaves the page.
     */
    disconnectedCallback() {
        if (this.animationTimerId) {
            window.clearInterval(this.animationTimerId);
        }

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    /**
     * Matches the canvas backing store to the rendered size and rebuilds the character grid when needed.
     */
    resize() {
        if (!this.canvasContext) {
            return;
        }

        const elementBounds = this.getBoundingClientRect();
        const parentBounds = this.parentElement?.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        const measuredWidth = elementBounds.width || parentBounds?.width || window.innerWidth;
        const measuredHeight = elementBounds.height || parentBounds?.height || 320;
        const nextCssWidth = Math.max(1, Math.floor(measuredWidth));
        const nextCssHeight = Math.max(1, Math.floor(measuredHeight));
        const nextCanvasWidth = Math.floor(nextCssWidth * pixelRatio);
        const nextCanvasHeight = Math.floor(nextCssHeight * pixelRatio);

        if (
            this.width === nextCssWidth &&
            this.height === nextCssHeight &&
            this.canvas.width === nextCanvasWidth &&
            this.canvas.height === nextCanvasHeight
        ) {
            return;
        }

        this.width = nextCssWidth;
        this.height = nextCssHeight;
        this.canvas.width = nextCanvasWidth;
        this.canvas.height = nextCanvasHeight;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const nextColumnCount = Math.ceil(this.width / this.cellSize);
        const nextRowCount = Math.ceil(this.height / this.cellSize) + 1;

        if (
            !this.dropHeadRows ||
            this.dropHeadRows.length !== nextColumnCount ||
            this.rowCount !== nextRowCount
        ) {
            this.columnCount = nextColumnCount;
            this.rowCount = nextRowCount;
            this.dropHeadRows = Array.from({ length: this.columnCount }, () =>
                Math.floor(Math.random() * this.rowCount),
            );
            this.columnStepSizes = Array.from({ length: this.columnCount }, (_, columnIndex) =>
                columnIndex % 4 === 0 ? 2 : 1,
            );
            this.characterGrid = Array.from({ length: this.columnCount }, () =>
                Array.from({ length: this.rowCount }, () =>
                    this.binaryCharacters[Math.floor(Math.random() * this.binaryCharacters.length)],
                ),
            );
        }

        this.canvasContext.fillStyle = this.backgroundResetColor;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
        this.drawStaticFrame();
    }

    /**
     * Paints the calm baseline grid so the hero is not empty before the first moving trail.
     */
    drawStaticFrame() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.canvasContext.font = `${this.cellSize}px 'Ubuntu Mono', monospace`;

        this.dropHeadRows.forEach((dropHeadRow, columnIndex) => {
            for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex += 1) {
                const character = this.characterGrid[columnIndex][rowIndex];
                const distanceFromHead = getWrappedDistance(dropHeadRow, rowIndex, this.rowCount);
                const opacity = Math.max(0.06, 0.28 - distanceFromHead * 0.035);

                this.canvasContext.fillStyle = getTrailColor(columnIndex, opacity);
                this.canvasContext.fillText(
                    character,
                    columnIndex * this.cellSize,
                    rowIndex * this.cellSize,
                );
            }
        });
    }

    /**
     * Advances each column's drop head and paints only the bright trail cells.
     */
    draw() {
        if (!this.dropHeadRows) {
            this.resize();
        }

        // The dark translucent fill preserves a few previous frames, creating the fading trail.
        this.canvasContext.fillStyle = this.backgroundTrailFadeColor;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
        this.canvasContext.font = `${this.cellSize}px 'Ubuntu Mono', monospace`;

        for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex += 1) {
            const textX = columnIndex * this.cellSize;
            const dropHeadRow = this.dropHeadRows[columnIndex];
            const columnStepSize = this.columnStepSizes[columnIndex];

            // Draw only the head and nearby cells instead of repainting the whole grid.
            for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex += 1) {
                const distanceFromHead = getWrappedDistance(dropHeadRow, rowIndex, this.rowCount);

                if (distanceFromHead > 10) {
                    continue;
                }

                const textY = rowIndex * this.cellSize;
                const character = this.characterGrid[columnIndex][rowIndex];
                const opacity = Math.max(0, 0.46 - distanceFromHead * 0.04);

                this.canvasContext.fillStyle =
                    distanceFromHead === 0
                        ? this.dropHeadColor
                        : getTrailColor(columnIndex, opacity);
                this.canvasContext.fillText(character, textX, textY);
            }

            this.dropHeadRows[columnIndex] = (dropHeadRow + columnStepSize) % this.rowCount;
        }
    }
}

/**
 * Alternates the trail color by column while keeping opacity controlled by the drop distance.
 */
function getTrailColor(columnIndex, opacity) {
    return columnIndex % 3 === 0
        ? `rgba(45, 212, 191, ${opacity})`
        : `rgba(147, 197, 253, ${opacity})`;
}

/**
 * Measures how far a row sits behind a drop head in a column that wraps vertically.
 */
function getWrappedDistance(headRow, targetRow, rowCount) {
    return headRow >= targetRow ? headRow - targetRow : headRow + rowCount - targetRow;
}
