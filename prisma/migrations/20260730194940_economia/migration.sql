-- CreateTable
CREATE TABLE "economia" (
    "idEconomia" SERIAL NOT NULL,
    "valor" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "economia_pkey" PRIMARY KEY ("idEconomia")
);

-- AddForeignKey
ALTER TABLE "economia" ADD CONSTRAINT "economia_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
