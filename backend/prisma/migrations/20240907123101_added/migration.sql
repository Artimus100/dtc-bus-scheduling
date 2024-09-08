-- CreateTable
CREATE TABLE "_BusCrews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusCrews_AB_unique" ON "_BusCrews"("A", "B");

-- CreateIndex
CREATE INDEX "_BusCrews_B_index" ON "_BusCrews"("B");

-- AddForeignKey
ALTER TABLE "_BusCrews" ADD CONSTRAINT "_BusCrews_A_fkey" FOREIGN KEY ("A") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusCrews" ADD CONSTRAINT "_BusCrews_B_fkey" FOREIGN KEY ("B") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
