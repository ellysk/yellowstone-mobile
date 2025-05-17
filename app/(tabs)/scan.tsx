import { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  CameraView,
  BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "failure" | null
  >(null);

  const VALID_BARCODE = "5036108403004";

  const verifyBarcode = (barcode: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulating API verification delay
      setTimeout(() => {
        resolve(barcode === VALID_BARCODE);
      }, 1500);
    });
  };

  const handleBarCodeScanned = useCallback(
    async ({ data }: BarcodeScanningResult) => {
      setScanned(true);
      setResult(data);
      setIsVerifying(true);

      try {
        const isValid = await verifyBarcode(data);
        setVerificationStatus(isValid ? "success" : "failure");
      } catch (error) {
        setVerificationStatus("failure");
      } finally {
        setIsVerifying(false);
      }
    },
    []
  );

  const handleScanAgain = useCallback(() => {
    setScanned(false);
    setResult(null);
    setVerificationStatus(null);
    setIsVerifying(false);
  }, []);

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-lg text-text-main">
          Camera permission is required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "code128",
            "code39",
            "ean13",
            "ean8",
            "pdf417",
            "aztec",
            "datamatrix",
          ],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="4:3" // Changed to 4:3 for better barcode scanning field of view
      />

      {/* Scanning overlay - optimized for barcode scanning */}
      <View className="absolute inset-0 flex-1 justify-center items-center">
        <View className="w-[280px] h-[120px] border-2 border-white opacity-70">
          {/* Corner markers for visual guidance */}
          <View className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
          <View className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
          <View className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
          <View className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
        </View>
        {/* Scanning hint text */}
        <Text className="text-white mt-4 opacity-70">
          Align barcode within the frame
        </Text>
      </View>

      {/* Result overlay */}
      {scanned && (
        <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          {isVerifying ? (
            <View className="items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-white mt-2">Verifying barcode...</Text>
            </View>
          ) : (
            <>
              <View className="items-center mb-4">
                {verificationStatus === "success" ? (
                  <Text className="text-green-500 text-lg font-bold mb-2">
                    ✓ Verification Successful
                  </Text>
                ) : verificationStatus === "failure" ? (
                  <Text className="text-red-500 text-lg font-bold mb-2">
                    ✗ Invalid Barcode
                  </Text>
                ) : null}
                <Text className="text-white text-center" numberOfLines={2}>
                  {result}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleScanAgain}
                className="bg-blue-500 py-2 px-4 rounded-lg self-center"
              >
                <Text className="text-white">Scan Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}
