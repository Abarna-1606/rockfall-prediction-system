package backend.service;

import backend.entity.Alert;
import backend.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public List<Alert> getActiveAlerts() {
        return alertRepository.findByIsResolvedFalse();
    }

    public Alert saveAlert(Alert alert) {
        return alertRepository.save(alert);
    }
}