-- CreateEnum
CREATE TYPE "VideoPlaybackPolicy" AS ENUM ('SIGNED', 'DRM');

-- AlterTable: videoUrl becomes optional (Mux-backed practices won't have one)
ALTER TABLE "Practice" ALTER COLUMN "videoUrl" DROP NOT NULL;

-- AlterTable: add Mux asset/playback tracking columns
ALTER TABLE "Practice" ADD COLUMN "muxAssetId" TEXT;
ALTER TABLE "Practice" ADD COLUMN "muxUploadId" TEXT;
ALTER TABLE "Practice" ADD COLUMN "muxPlaybackId" TEXT;
ALTER TABLE "Practice" ADD COLUMN "muxPlaybackPolicy" "VideoPlaybackPolicy";

-- CreateIndex
CREATE UNIQUE INDEX "Practice_muxAssetId_key" ON "Practice"("muxAssetId");
CREATE UNIQUE INDEX "Practice_muxUploadId_key" ON "Practice"("muxUploadId");
CREATE UNIQUE INDEX "Practice_muxPlaybackId_key" ON "Practice"("muxPlaybackId");
