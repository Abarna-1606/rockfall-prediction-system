package backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PredictionService {

    public Map<String, Object> predict(double seismic,
            double slope, double rainfall, double vibration) {

        // AI Risk Formula (weighted scoring)
        double score = (seismic * 0.35) + (slope * 0.30)
                     + (rainfall * 0.20) + (vibration * 0.15);

        String level;
        String message;

        if (score >= 75) {
            level = "RED";
            message = "DANGER! Immediate evacuation required!";
        } else if (score >= 50) {
            level = "ORANGE";
            message = "HIGH RISK! Prepare for evacuation.";
        } else if (score >= 25) {
            level = "YELLOW";
            message = "MEDIUM RISK! Monitor closely.";
        } else {
            level = "GREEN";
            message = "LOW RISK. Normal operations.";
        }

        Map<String, Object> result = new HashMap<>();
        result.put("riskScore", Math.round(score * 100.0) / 100.0);
        result.put("alertLevel", level);
        result.put("message", message);
        return result;
    }
}